import { Resolver, Query, Mutation, ResolveReference, Args } from '@nestjs/graphql';
import {Collection} from './collection.model';
import { CollectionService } from './collection.service';
import { BadRequestException } from '@nestjs/common';

@Resolver(()=> Collection)
export class CollectionResolver {
    constructor(private readonly collectionService: CollectionService) {}

    @Query(() => [Collection])
    async getAllCollections(): Promise<Collection[]> {
      return this.collectionService.findAll();
    }

    @Query(() => Collection)
    async getCollectionById(@Args('id') id: string):Promise<Collection | null>{
      const result = await this.collectionService.find(id)
      if(!result){
        throw new BadRequestException(`Collection not found with id: ${id}`);
      }
      return result
    }

    @Mutation(() => Collection)
    async createCollection(@Args('title') title: string): Promise<Collection> {
      return this.collectionService.create(title);
    }

    @Mutation(() => Boolean)
    async deleteCollection(@Args('id') id: string): Promise<Boolean> {
      return this.collectionService.delete(id);
    }

    @ResolveReference()
    async resolveReference(reference: {
      __typename: string;
      _id: string;
    }): Promise<Collection> {
      try {
        const result = await this.collectionService.find(reference._id);
        if (result) {
          return result;
        }
      } catch (e: any) {}
  
      throw new BadRequestException(
        `Collection not found with id: ${reference._id}`,
      );
    }
}