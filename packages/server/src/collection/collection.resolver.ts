import { Resolver, Query, Mutation, ResolveReference, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Collection } from './collection.model';
import { CollectionService } from './collection.service';
import { BadRequestException } from '@nestjs/common';
import { CollectionType } from './collection.type'
import { PageInfoInput, PaginatedCollections} from './collection.pageinfo'
import { Participant } from '../participant/participant.model'
import { ParticipantService } from '../participant/participant.service'
import { Shares } from '../share/share.model'
import { ShareService } from '../share/share.service'

@Resolver(()=> Collection)
export class CollectionResolver {
    constructor(
      private readonly participantService: ParticipantService,
      private readonly collectionService: CollectionService,
      private readonly shareService:ShareService
    ) {}

    @Query(() => PaginatedCollections)
    async getAllCollections(@Args('input') input: PageInfoInput): Promise<PaginatedCollections> {
      return this.collectionService.findAll(input);
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
    async createCollection(@Args('input') input: CollectionType): Promise<Collection> {
      return this.collectionService.create(input);
    }

    @Mutation(() => Boolean)
    async deleteCollection(@Args('id') id: string): Promise<Boolean> {
      return this.collectionService.delete(id);
    }

    @ResolveField(() => [Participant])
    async participants(@Parent() collection: Collection): Promise<Participant[]> {
      return this.participantService.findByCollectionId(collection._id.toString());
    }

    @ResolveField(() => [Shares])
    async shares(@Parent() collection: Collection): Promise<Shares[]> {
      return this.shareService.getCollectionShares(collection._id.toString());
    }

    @ResolveReference()
    async resolveReference(reference: {
      __typename: string;
      _id: string;
    }): Promise<Collection> {
      const result = await this.collectionService.find(reference._id);
      if(!result){
        throw new BadRequestException(`Collection not found with id: ${reference._id}`);
      }
      return result;
    }
}