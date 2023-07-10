import {
  Resolver,
  Query,
  ResolveReference,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { Participant } from './Participant.model';
import { ParticipantService } from './Participant.service';
import { BadRequestException, Controller } from '@nestjs/common';
import { ParticipantsArgs } from 'src/dto/participants.input';
import { CreateParticipantDto } from 'src/dto/participant.dto';

@Controller('participant')
@Resolver(() => Participant)
export class ParticipantResolver {
  constructor(private readonly participantService: ParticipantService) {}

  @Query(() => [Participant])
  async participants(@Args() args: ParticipantsArgs): Promise<Participant[]> {
    return this.participantService.findAll(args);
  }

  @Query(() => Participant)
  async participant(
    @Args('participantId')
    id: string,
  ): Promise<Participant> {
    return this.participantService.find(id);
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
