import { Resolver, Query, Mutation, ResolveReference } from '@nestjs/graphql';
import {Collection} from './collection.model';
import { CollectionService } from './collection.service';
import mongoose from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Resolver(()=> Collection)
export class CollectionResolver {
    constructor(private readonly collectionService: CollectionService) {}

    @Mutation(()=> Collection)
    async createCollection(title:string){
        return this.collectionService.create(title);
    }

    @Query(()=>[Collection])
    async getAllCollections():Promise<Collection[]>{
        return this.collectionService.findAll();
    }

    @ResolveReference()
    async getCollectionById(id:string):Promise<Collection>{
        try {
            const result = await this.collectionService.find(new mongoose.Types.ObjectId(id))
            if(result){
                return result
            }
        } catch(e:any) {}
        
        throw new BadRequestException(`Collection not found with id: ${id}`);
    }
}