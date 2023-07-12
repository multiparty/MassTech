import {
  Resolver,
  Query,
  ResolveReference,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { Participant } from './Participant.model';
import { ParticipantService } from './Participant.service';
import { BadRequestException } from '@nestjs/common';
import { ParticipantsArgs } from '../dto/participants.input';
import { CreateParticipantDto } from '../dto/participant.dto';

@Resolver(() => Participant)
export class ParticipantResolver {
  constructor(private readonly participantService: ParticipantService) {}

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
