import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CollectionType {
  @Field()
  description: string;

  @Field()
  state: string;

  @Field()
  prime: number;

  @Field()
  publicKey: string;

  @Field()
  threshold: number;

  @Field()
  projectId: string;
}
