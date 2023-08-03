import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shares, SharesSchema } from './share.model'
import { ShareService } from './share.service';
import { ShareResolver } from './share.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: Shares.name, schema: SharesSchema}])],
  providers: [ShareResolver, ShareService],
  exports: [ShareService]

})
export class ShareModule {}
