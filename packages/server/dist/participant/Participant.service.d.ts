import { Model } from 'mongoose';
import { Participant } from './participant.model';
export declare class CreateParticipantDto {
    collectionId: string;
}
export declare class ParticipantService {
    private participantModel;
    constructor(participantModel: Model<Participant>);
    create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
    findAll(): Promise<Participant[]>;
    find(id: string): Promise<Participant | null>;
    delete(id: string): Promise<boolean>;
}
