import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateParticipantDto {
  @Field()
  collectionId: string;
}