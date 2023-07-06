import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from './collection.model'
import { CollectionService } from './collection.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema}])],
    providers: [Collection],
    exports: [CollectionService]
  })

export class CollectionModule {}