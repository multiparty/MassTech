import { Field, InputType, ObjectType } from '@nestjs/graphql';

export enum ShareTypeEnum {
  ENCRYPTED = 'encrypted',
  NUMBER = 'number',
}

@InputType('ShareInput')
@ObjectType('Share')
export class Share {
  @Field()
  x: string;

  @Field()
  y: string;

  @Field(() => ShareTypeEnum)
  type: ShareTypeEnum;
}