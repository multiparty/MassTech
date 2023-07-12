import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateParticipantDto } from '../dto/participant.dto';
import { ParticipantsArgs } from '../dto/participants.input';
import { Participant } from './participant.model';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}

  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    const createdParticipant = await this.participantModel.create({
      ...createParticipantDto,
      createdAt: new Date(),
      deletedAt: null,
      metadata: {},
    });
    return createdParticipant;
  }

  findAll(
    args: ParticipantsArgs = { skip: 0, take: 5 },
  ): Promise<Participant[]> {
    return this.participantModel
      .find({ deletedAt: null }, null, {
        limit: args.take,
        skip: args.skip,
      })
      .exec();
  }

  find(id: string): Promise<Participant | null> {
    return this.participantModel
      .findById(new mongoose.Types.ObjectId(id))
      .where('deletedAt')
      .equals(null)
      .exec();
  }

  async delete(id: string) {
    const participantToDelete = await this.participantModel
      .findOneAndUpdate(new mongoose.Types.ObjectId(id), {
        deletedAt: new Date(),
      })
      .exec();
    return !!participantToDelete;
  }
}
