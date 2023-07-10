import { Participant } from './Participant.model';
import { CreateParticipantDto, ParticipantService } from './Participant.service';
export declare class ParticipantController {
    private readonly participantService;
    constructor(participantService: ParticipantService);
    getParticipants(): Promise<Participant[]>;
    createParticipant(participantDto: CreateParticipantDto): Promise<Participant>;
    resolveReference(reference: {
        __typename: string;
        _id: string;
    }): Promise<Participant>;
}
