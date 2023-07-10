import { Resolver, Query, ResolveReference } from '@nestjs/graphql';
import { Participant } from './Participant.model';
import {
  CreateParticipantDto,
  ParticipantService,
} from './Participant.service';
import mongoose from 'mongoose';
import { BadRequestException, Controller, Get, Post } from '@nestjs/common';

@Controller('participant')
@Resolver(() => Participant)
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get()
  @Query(() => [Participant])
  async getParticipants(): Promise<Participant[]> {
    return this.participantService.findAll();
  }

  @Post()
  async createParticipant(
    participantDto: CreateParticipantDto,
  ): Promise<Participant> {
    console.log('called createParticipant HAHAHAH');
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
