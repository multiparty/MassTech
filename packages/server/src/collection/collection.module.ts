import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from './collection.model'
import { CollectionService } from './collection.service'
import { CollectionResolver } from './collection.resolver';
import { ParticipantModule } from '../participant/participant.module'
import { ShareModule } from '../share/share.module'

@Module({
    imports: [
      ShareModule,
      ParticipantModule,
      MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema}])],
    providers: [CollectionService, CollectionResolver],
    exports: [CollectionService]
  })

export class CollectionModule {}