import { Module } from '@nestjs/common';
import { MpcService } from './mpc.service';
import { MpcController } from './mpc.controller';

@Module({
  providers: [MpcService],
  controllers: [MpcController],
})
export class MpcModule {}
