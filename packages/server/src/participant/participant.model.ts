import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Participant {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Prop()
  @Field()
  collectionId: string;
}

export type ParticipantDocument = Participant & Document;
export const ParticipantSchema = SchemaFactory.createForClass(Participant);