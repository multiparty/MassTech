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
    const createdParticipant = await this.participantModel.create(
      createParticipantDto,
    );
    return createdParticipant;
  }

  findAll(): Promise<Participant[]> {
    return this.participantModel.find().exec();
  }

  find(id: mongoose.Types.ObjectId): Promise<Participant | null> {
    return this.participantModel.findById(id).exec();
  }

  findByBucket(bucket: string): Promise<Participant | null> {
    return this.participantModel.findOne({ bucket }).exec();
  }
}
