import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Share } from './entities/share.entity'

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Shares {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Prop()
  @Field()
  participantid: string;
  
  @Prop()
  @Field()
  collectionid: string;

  @Prop()
  @Field()
  name: string;

  @Prop( {type: mongoose.Schema.Types.Date, default: Date.now} )
  @Field(() => Date)
  createdAt: Date;

  @Prop()
  @Field()
  shares: Share[];

  @Prop()
  @Field()
  metadata: JSON
}

export type SharesDocument = Shares & Document;
export const SharesSchema = SchemaFactory.createForClass(Shares);