import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionModule } from './collection/collection.module'
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), CollectionModule, GraphQLModule.forRoot({
    autoSchemaFile: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
