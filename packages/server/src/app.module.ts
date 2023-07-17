import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ParticipantModule } from './participant/participant.module';
import { join } from 'path';

const MONGO_DB_HOST = 'mongodb-server:27017'; //matches mongo server name and port in docker-compose file
const MONGO_DB_NAME = 'maindb';
const DATABASE_ULR = 'mongodb://' + MONGO_DB_HOST + '/' + MONGO_DB_NAME;

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_ULR),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ParticipantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
