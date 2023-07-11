import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ParticipantModule } from './participant/participant.module';
import { CollectionModule } from './collection/collection.module';

import { join } from 'path';

const DATABASE_ULR = 'mongodb://localhost:27017/testDB';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_ULR),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ParticipantModule,
    CollectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
