import { Controller, Post, Body, Res } from '@nestjs/common';
import { MpcService } from './mpc.service';
import { Response } from 'express';

@Controller('mpc')
export class MpcController {
  constructor(private readonly mpcService: MpcService) {}

  @Post('run')
  async runMpc(@Body() body: { data1: any; data2: any }, @Res() res: Response) {
    try {
      const output = await this.mpcService.runMpc(body.data1, body.data2);
      res.status(200).json({ output });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
