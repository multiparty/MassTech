import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Collection, CollectionDocument } from './collection.model'
import { CollectionType } from './collection.type'

@Injectable()
export class CollectionService {
    constructor(@InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>) {}
    
    async create(input:CollectionType):Promise<Collection>{
        const createdCollection = new this.collectionModel(input);
        return createdCollection.save();
    }

    async findAll(): Promise<Collection[]>{
        return this.collectionModel.find({ deletedAt: null }).exec()
    }

    async find(id: string): Promise<Collection|null>{
        return this.collectionModel.findById(new mongoose.Types.ObjectId(id)).exec()
    }

    async delete(id: string) {
        const collectionToDelete = await this.collectionModel
        .findOneAndUpdate(new mongoose.Types.ObjectId(id), {
          deletedAt: new Date(),
        })
        .exec();
        return !!collectionToDelete;
      }
}