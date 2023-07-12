
import { Field, Int, ArgsType } from '@nestjs/graphql'

@ArgsType()
export class ParticipantsArgs {
  @Field(() => Int)
  skip = 0

  @Field(() => Int)
  take = 25
}