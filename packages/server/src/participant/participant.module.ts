import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './participant.model';
import { ParticipantService } from './participant.service';
import { ParticipantResolver } from './participant.resolver';
import { ParticipantController } from './particpant.controller';
import { ShareModule } from '../share/share.module'

@Module({
  imports: [
    ShareModule,
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
  providers: [ParticipantService, ParticipantResolver],
  controllers: [ParticipantController],
  exports: [ParticipantService],
})
export class ParticipantModule {}
