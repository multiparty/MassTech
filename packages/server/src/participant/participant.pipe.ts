import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Participant } from './participant.model';
import { ParticipantService } from './participant.service';
import mongoose from 'mongoose';

@Injectable()
export class ParticipantPipe implements PipeTransform<string, Promise<Participant>> {
  constructor(private readonly orgService: ParticipantService) {}

  async transform(value: string): Promise<Participant> {
    try {
      const org = await this.orgService.find(new mongoose.Types.ObjectId(value));
      if (org) {
        return org;
      }
    } catch (_e) {}

    throw new BadRequestException(`Participant ${value} does not exist`);
  }
}