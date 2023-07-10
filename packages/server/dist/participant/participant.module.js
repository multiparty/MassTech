"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Participant_model_1 = require("./Participant.model");
const Participant_service_1 = require("./Participant.service");
const Participant_resolver_1 = require("./Participant.resolver");
const particpant_controller_1 = require("./particpant.controller");
let ParticipantModule = class ParticipantModule {
};
ParticipantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: Participant_model_1.Participant.name, schema: Participant_model_1.ParticipantSchema },
            ]),
        ],
        providers: [Participant_service_1.ParticipantService, Participant_resolver_1.ParticipantResolver],
        controllers: [particpant_controller_1.ParticipantController],
        exports: [Participant_service_1.ParticipantService],
    })
], ParticipantModule);
exports.ParticipantModule = ParticipantModule;
//# sourceMappingURL=participant.module.js.map