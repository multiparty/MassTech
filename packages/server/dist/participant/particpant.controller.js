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
exports.ParticipantController = void 0;
const graphql_1 = require("@nestjs/graphql");
const Participant_model_1 = require("./Participant.model");
const Participant_service_1 = require("./Participant.service");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
let ParticipantController = class ParticipantController {
    constructor(participantService) {
        this.participantService = participantService;
    }
    async getParticipants() {
        return this.participantService.findAll();
    }
    async createParticipant(participantDto) {
        console.log('called createParticipant HAHAHAH');
        return this.participantService.create(participantDto);
    }
    async resolveReference(reference) {
        try {
            const result = await this.participantService.find(new mongoose_1.default.Types.ObjectId(reference._id));
            if (result) {
                return result;
            }
        }
        catch (e) { }
        throw new common_1.BadRequestException(`Participant not found with id: ${reference._id}`);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, graphql_1.Query)(() => [Participant_model_1.Participant]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "getParticipants", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Participant_service_1.CreateParticipantDto]),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "createParticipant", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "resolveReference", null);
ParticipantController = __decorate([
    (0, common_1.Controller)('participant'),
    (0, graphql_1.Resolver)(() => Participant_model_1.Participant),
    __metadata("design:paramtypes", [Participant_service_1.ParticipantService])
], ParticipantController);
exports.ParticipantController = ParticipantController;
//# sourceMappingURL=particpant.controller.js.map