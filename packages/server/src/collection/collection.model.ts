import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Participant } from '../participant/participant.model'
import { Shares } from '../share/share.model'

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Collection {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Prop()
  @Field()
  title: string;
  
  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  state: string;

  @Prop()
  @Field()
  prime: number;

  @Prop()
  @Field()
  publicKey: string;

  @Prop()
  @Field()
  threshold: number;

  @Prop()
  @Field()
  projectId: string;

  @Prop( {type: mongoose.Schema.Types.Date, default: Date.now} )
  @Field(() => Date)
  createdAt: Date;

  @Prop()
  @Field()
  createdBy: string;

  @Prop( {type: mongoose.Schema.Types.Date} )
  @Field(() => Date)
  lastClosedAt: Date;

  @Prop( {type: mongoose.Schema.Types.Date} )
  @Field(() => Date)
  lastOpenedAt: Date;
  
  @Prop()
  @Field({ nullable: true })
  deletedAt: Date

  @Prop()
  @Field(() => [Participant])
  participants: Participant[]

  @Prop()
  @Field(() => [Shares])
  Shares: Shares[]
}

export type CollectionDocument = Collection & Document;
export const CollectionSchema = SchemaFactory.createForClass(Collection);