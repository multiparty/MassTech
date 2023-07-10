"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantPipe = void 0;
const common_1 = require("@nestjs/common");
const participant_service_1 = require("./participant.service");
let ParticipantPipe = class ParticipantPipe {
    constructor(participantService) {
        this.participantService = participantService;
    }
    async transform(value) {
        try {
            const participant = await this.participantService.find(value);
            if (participant) {
                return participant;
            }
        }
        catch (_e) { }
        throw new common_1.BadRequestException(`Participant ${value} does not exist`);
    }
};
ParticipantPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [participant_service_1.ParticipantService])
], ParticipantPipe);
exports.ParticipantPipe = ParticipantPipe;
//# sourceMappingURL=participant.pipe.js.map