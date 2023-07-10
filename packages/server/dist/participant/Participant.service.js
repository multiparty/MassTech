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
exports.ParticipantService = exports.CreateParticipantDto = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const participant_model_1 = require("./participant.model");
let CreateParticipantDto = class CreateParticipantDto {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateParticipantDto.prototype, "collectionId", void 0);
CreateParticipantDto = __decorate([
    (0, graphql_1.InputType)()
], CreateParticipantDto);
exports.CreateParticipantDto = CreateParticipantDto;
let ParticipantService = class ParticipantService {
    constructor(participantModel) {
        this.participantModel = participantModel;
    }
    async create(createParticipantDto) {
        const createdParticipant = await this.participantModel.create(Object.assign(Object.assign({}, createParticipantDto), { createdAt: new Date(), deletedAt: null, metadata: {} }));
        return createdParticipant;
    }
    findAll() {
        return this.participantModel.find({ deletedAt: null }).exec();
    }
    find(id) {
        return this.participantModel.findById(new mongoose_2.default.Types.ObjectId(id)).exec();
    }
    async delete(id) {
        const participantToDelete = await this.participantModel.findOneAndUpdate(new mongoose_2.default.Types.ObjectId(id), { deletedAt: new Date() }).exec();
        return !!participantToDelete;
    }
};
ParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(participant_model_1.Participant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ParticipantService);
exports.ParticipantService = ParticipantService;
//# sourceMappingURL=Participant.service.js.map