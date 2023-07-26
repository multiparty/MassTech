import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('ShareInput')
@ObjectType('Share')
export class Share {
  @Field()
  x: string;

  @Field()
  y: string;

  @Field()
  type: string;
}