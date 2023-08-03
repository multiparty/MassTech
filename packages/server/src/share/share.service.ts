import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Shares, SharesDocument } from './share.model'
import { ShareType } from './share.type'

@Injectable()
export class ShareService {
      constructor(@InjectModel(Shares.name) private shareModel: Model<SharesDocument>) {}
  
      async create(input:ShareType):Promise<Shares>{
          const createdShare = new this.shareModel(input);
          return createdShare.save();
      }
  
      async getCollectionShares(collectionid:string): Promise<Shares[]> {
          const shares = await this.shareModel
          .find({ collectionid: collectionid, deletedAt: null })
          .exec();
          return shares;
      }

      async getParticipantShares(participantid:string): Promise<Shares[]> {
        const shares = await this.shareModel
        .find({ participantid: participantid, deletedAt: null })
        .exec();
        return shares;
      }
      
      async find(id: string): Promise<Shares|null>{
        return this.shareModel.findById(new mongoose.Types.ObjectId(id)).exec()
      }

      async updateShares(id: string, input: ShareType): Promise<Shares> {
        const updatedShares = await this.shareModel
        .findByIdAndUpdate(new mongoose.Types.ObjectId(id), input, { new: true })
        .exec();
        return updatedShares;
    }

      async delete(id: string) {
          const sharesToDelete = await this.shareModel
          .findOneAndUpdate(new mongoose.Types.ObjectId(id), {
            deletedAt: new Date(),
          })
          .exec();
          return !!sharesToDelete;
        }
  }
