import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Participant } from './participant.model';
import { ParticipantService } from './participant.service';
import mongoose from 'mongoose';

@Injectable()
export class ParticipantPipe implements PipeTransform<string, Promise<Participant>> {
  constructor(private readonly participantService: ParticipantService) {}

  async transform(value: string): Promise<Participant> {
    try {
      const participant = await this.participantService.find(value);
      if (participant) {
        return participant;
      }
    } catch (_e) {}

    throw new BadRequestException(`Participant ${value} does not exist`);
  }
}