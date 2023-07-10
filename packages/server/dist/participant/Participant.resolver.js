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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const Participant_model_1 = require("./Participant.model");
const Participant_service_1 = require("./Participant.service");
const common_1 = require("@nestjs/common");
let ParticipantResolver = class ParticipantResolver {
    constructor(participantService) {
        this.participantService = participantService;
    }
    async participants() {
        return this.participantService.findAll();
    }
    async participant(id) {
        return this.participantService.find(id);
    }
    async createParticipant(participantDto) {
        return this.participantService.create(participantDto);
    }
    async deleteParticipant(id) {
        return this.participantService.delete(id);
    }
    async resolveReference(reference) {
        try {
            const result = await this.participantService.find(reference._id);
            if (result) {
                return result;
            }
        }
        catch (e) { }
        throw new common_1.BadRequestException(`Participant not found with id: ${reference._id}`);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [Participant_model_1.Participant]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParticipantResolver.prototype, "participants", null);
__decorate([
    (0, graphql_1.Query)(() => Participant_model_1.Participant),
    __param(0, (0, graphql_1.Args)('participantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantResolver.prototype, "participant", null);
__decorate([
    (0, graphql_1.Mutation)(() => Participant_model_1.Participant),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Participant_service_1.CreateParticipantDto]),
    __metadata("design:returntype", Promise)
], ParticipantResolver.prototype, "createParticipant", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('participantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantResolver.prototype, "deleteParticipant", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParticipantResolver.prototype, "resolveReference", null);
ParticipantResolver = __decorate([
    (0, common_1.Controller)('participant'),
    (0, graphql_1.Resolver)(() => Participant_model_1.Participant),
    __metadata("design:paramtypes", [Participant_service_1.ParticipantService])
], ParticipantResolver);
exports.ParticipantResolver = ParticipantResolver;
//# sourceMappingURL=Participant.resolver.js.map