import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Share } from './entities/share'

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
  @Field({ nullable: true })
  deletedAt: Date

  @Prop()
  @Field(() => [Share])
  shares: Share[];

  @Prop({ type: mongoose.Schema.Types.Mixed })
  @Field(type => GraphQLJSONObject)
  metadata: any;  
}

export type SharesDocument = Shares & Document;
export const SharesSchema = SchemaFactory.createForClass(Shares);