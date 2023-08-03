import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ShareTypeEnum {
  ENCRYPTED = 'encrypted',
  NUMBER = 'number',
}

registerEnumType(ShareTypeEnum, {
  name: "ShareTypeEnum",
});

@InputType('ShareInput')
@ObjectType('Share')
export class Share {
  @Field()
  x: string;

  @Field()
  y: string;

  @Field(type => ShareTypeEnum)
  type: ShareTypeEnum;
}