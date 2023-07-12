import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './Participant.model';
import { ParticipantService } from './Participant.service';
import { ParticipantResolver } from './Participant.resolver';
import { ParticipantController } from './particpant.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
  providers: [ParticipantService, ParticipantResolver],
  controllers: [ParticipantController],
  exports: [ParticipantService],
})
export class ParticipantModule {}
