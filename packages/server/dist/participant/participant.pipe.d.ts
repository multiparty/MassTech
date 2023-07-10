import { PipeTransform } from '@nestjs/common';
import { Participant } from './participant.model';
import { ParticipantService } from './participant.service';
export declare class ParticipantPipe implements PipeTransform<string, Promise<Participant>> {
    private readonly participantService;
    constructor(participantService: ParticipantService);
    transform(value: string): Promise<Participant>;
}
