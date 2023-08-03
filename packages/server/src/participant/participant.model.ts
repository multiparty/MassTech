import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Shares } from '../share/share.model'

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Participant {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Prop()
  metadata: mongoose.Types.Map<String>;

  @Prop()
  @Field()
  collectionId: string;

  @Prop()
  @Field()
  createdAt: Date

  @Prop()
  @Field({ nullable: true })
  deletedAt: Date

  @Prop()
  @Field(() => [Shares])
  Shares: Shares[]
}

export type ParticipantDocument = Participant & Document;
export const ParticipantSchema = SchemaFactory.createForClass(Participant);