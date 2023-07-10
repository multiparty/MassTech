import { Participant } from './Participant.model';
import { CreateParticipantDto, ParticipantService } from './Participant.service';
export declare class ParticipantResolver {
    private readonly participantService;
    constructor(participantService: ParticipantService);
    participants(): Promise<Participant[]>;
    participant(id: string): Promise<Participant>;
    createParticipant(participantDto: CreateParticipantDto): Promise<Participant>;
    deleteParticipant(id: string): Promise<boolean>;
    resolveReference(reference: {
        __typename: string;
        _id: string;
    }): Promise<Participant>;
}
