import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { ShareService } from './share.service';
import { Shares } from './share.model'
import { ShareType } from './share.type'
import { BadRequestException } from '@nestjs/common';

@Resolver(()=> Shares)
export class ShareResolver {
  constructor(private readonly shareService: ShareService) {}

  @Mutation(()=> Shares)
  async createShares(@Args('input') input: ShareType): Promise<Shares> {
    return this.shareService.create(input);
  }

  @Query(()=> [Shares])
  async getCollectionShares(@Args('collectionid') collectionid:string) : Promise<Shares> {
    return this.shareService.getCollectionShares(collectionid);
  }

  @Query(() => [Shares])
  async getParticipantShares(@Args('participantId') participantId: string) : Promise<Shares> {
        return this.shareService.getParticipantShares(participantId);
  }
  
  @Mutation(()=> Shares)
  async updateShares(@Args('id') id:string, @Args('updateShareInput') updateShareInput: ShareType) {
    return this.shareService.updateShares(id, updateShareInput);
  }

  @Mutation(() => Boolean)
  async deleteShare(@Args('id') id: string) {
      return this.shareService.delete(id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: string;
  }): Promise<Shares> {
    const result = await this.shareService.find(reference._id);
    if(!result){
      throw new BadRequestException(`Shares not found with id: ${reference._id}`);
    }
    return result;
  }
}
