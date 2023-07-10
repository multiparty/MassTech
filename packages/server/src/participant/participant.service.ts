import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Participant } from './participant.model';

@InputType()
export class CreateParticipantDto {
  @Field()
  collectionId: string;
}

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

  findAll(): Promise<Participant[]> {
    return this.participantModel.find({ deletedAt: null }).exec();
  }

  find(id: string): Promise<Participant | null> {
    return this.participantModel
      .findById(new mongoose.Types.ObjectId(id))
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
