"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddEventDto = void 0;
var class_validator_1 = require("class-validator");
var AddEventDto = /** @class */ (function () {
    function AddEventDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], AddEventDto.prototype, "title");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], AddEventDto.prototype, "privacy");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], AddEventDto.prototype, "type");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], AddEventDto.prototype, "startDate");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], AddEventDto.prototype, "endDate");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], AddEventDto.prototype, "city");
    __decorate([
        class_validator_1.IsOptional()
    ], AddEventDto.prototype, "fee");
    __decorate([
        class_validator_1.IsOptional()
    ], AddEventDto.prototype, "description");
    return AddEventDto;
}());
exports.AddEventDto = AddEventDto;
