import { InputType, Field } from '@nestjs/graphql';
import { Share } from './entities/share'

@InputType()
export class ShareType {

  @Field()
  participantid: string;
  
  @Field()
  collectionid: string;

  @Field()
  name: string;

  @Field(() => [Share])
  shares: Share[];
}
