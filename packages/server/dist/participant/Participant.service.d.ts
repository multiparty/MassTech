import mongoose, { Model } from 'mongoose';
import { Participant } from './participant.model';
export declare class CreateParticipantDto {
    collectionId: string;
}
export declare class ParticipantService {
    private participantModel;
    constructor(participantModel: Model<Participant>);
    create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
    findAll(): Promise<Participant[]>;
    find(id: mongoose.Types.ObjectId): Promise<Participant | null>;
    findByBucket(bucket: string): Promise<Participant | null>;
}
