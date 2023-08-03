import {
  Resolver,
  Query,
  ResolveReference,
  Mutation, 
  ResolveField, 
  Parent,
  Args,
} from '@nestjs/graphql';
import { Participant } from './participant.model';
import { ParticipantService } from './participant.service';
import { BadRequestException } from '@nestjs/common';
import { ParticipantsArgs } from '../dto/participants.input';
import { CreateParticipantDto } from '../dto/participant.dto';
import { ShareService } from '../share/share.service'
import { Shares } from '../share/share.model'

@Resolver(() => Participant)
export class ParticipantResolver {
  constructor(
      private readonly participantService: ParticipantService,
      private readonly shareService:ShareService
    ) {}

  @Query(() => [Participant])
  async participants(@Args() args: ParticipantsArgs): Promise<Participant[]> {
    return this.participantService.findAll(args);
  }

  @Query(() => Participant, { nullable: true })
  async participant(
    @Args('participantId')
    id: string,
  ): Promise<Participant | null> {
    return this.participantService.find(id);
  }

  @Query(() => Number)
  async getNumOfParticipants(): Promise<Number> {
    console.log(' getCount called');
    return this.participantService.getCount();
  }

  @Mutation(() => Participant)
  async createParticipant(
    @Args('input')
    participantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return this.participantService.create(participantDto);
  }

  @Mutation(() => Boolean)
  async deleteParticipant(
    @Args('participantId')
    id: string,
  ): Promise<boolean> {
    return this.participantService.delete(id);
  }

  @ResolveField(() => [Shares])
  async shares(@Parent() participant: Participant): Promise<Shares[]> {
    return this.shareService.getParticipantShares(participant._id.toString());
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: string;
  }): Promise<Participant> {
    try {
      return this.participantService.find(reference._id);
    } catch (e: any) {}

    throw new BadRequestException(
      `Participant not found with id: ${reference._id}`,
    );
  }
}
