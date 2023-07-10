import {
  Resolver,
  Query,
  ResolveReference,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { Participant } from './Participant.model';
import {
  CreateParticipantDto,
  ParticipantService,
} from './Participant.service';
import mongoose from 'mongoose';
import { BadRequestException, Controller, Get, Post } from '@nestjs/common';

@Controller('participant')
@Resolver(() => Participant)
export class ParticipantResolver {
  constructor(private readonly participantService: ParticipantService) {}

  @Query(() => [Participant])
  async participants(): Promise<Participant[]> {
    return this.participantService.findAll();
  }

  @Mutation(() => Participant)
  async createParticipant(
    @Args('input')
    participantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return this.participantService.create(participantDto);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: string;
  }): Promise<Participant> {
    try {
      const result = await this.participantService.find(
        new mongoose.Types.ObjectId(reference._id),
      );
      if (result) {
        return result;
      }
    } catch (e: any) {}

    throw new BadRequestException(
      `Participant not found with id: ${reference._id}`,
    );
  }
}
