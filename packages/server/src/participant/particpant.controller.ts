import { Query, ResolveReference } from '@nestjs/graphql';
import { Participant } from './Participant.model';
import { ParticipantService } from './Participant.service';
import { BadRequestException, Controller, Get, Post } from '@nestjs/common';
import { CreateParticipantDto } from '../dto/participant.dto';

@Controller('participant')
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
    return this.participantService.create(participantDto);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: string;
  }): Promise<Participant> {
    try {
      const result = await this.participantService.find(reference._id);
      if (result) {
        return result;
      }
    } catch (e: any) {}

    throw new BadRequestException(
      `Participant not found with id: ${reference._id}`,
    );
  }
}
