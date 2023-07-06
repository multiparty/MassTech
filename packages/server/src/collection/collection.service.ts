import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Collection, CollectionDocument } from './collection.model'

@Injectable()
export class CollectionService {
    constructor(@InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>) {}
    
    async create(title:string):Promise<Collection>{
        const createdCollection = new this.collectionModel({title});
        return createdCollection.save();
    }

    async findAll(): Promise<Collection[]>{
        return this.collectionModel.find().exec()
    }

    async find(id: mongoose.Types.ObjectId): Promise<Collection|null>{
        return this.collectionModel.findById(id).exec()
    }
}