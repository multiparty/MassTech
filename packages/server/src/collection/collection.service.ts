import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Collection, CollectionDocument } from './collection.model'
import { CollectionType } from './collection.type'
import { PageInfo, PageInfoInput, PaginatedCollections} from './collection.pageinfo'

@Injectable()
export class CollectionService {
    constructor(@InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>) {}

    async create(input:CollectionType):Promise<Collection>{
        const createdCollection = new this.collectionModel(input);
        return createdCollection.save();
    }

    async findAll(input: PageInfoInput): Promise<PaginatedCollections> {
        const { page, pageSize } = input;
        const skipCount = (page - 1) * pageSize;
        const collections = await this.collectionModel
            .find({ deletedAt: null })
            .skip(skipCount)
            .limit(pageSize)
            .exec();


        const startIndex = (page - 1) * pageSize
        const endIndex = page * pageSize;

        const pageInfo: PageInfo = {
            pageSize: pageSize,
            page: page,
            total: collections.length,
            hasNext: endIndex < collections.length,
            hasPrev: startIndex > 0,
        };

        const paginatedCollection:PaginatedCollections = {
            data:collections,
            pageInfo: pageInfo
        }
        return paginatedCollection;
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