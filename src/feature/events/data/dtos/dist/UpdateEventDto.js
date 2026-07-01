"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateEventDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateEventDto = /** @class */ (function () {
    function UpdateEventDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEventDto.prototype, "title");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateEventDto.prototype, "privacy");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEventDto.prototype, "type");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateEventDto.prototype, "startDate");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateEventDto.prototype, "endDate");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEventDto.prototype, "city");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEventDto.prototype, "venue");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber()
    ], UpdateEventDto.prototype, "age");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateEventDto.prototype, "fee");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEventDto.prototype, "profile");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateEventDto.prototype, "location");
    return UpdateEventDto;
}());
exports.UpdateEventDto = UpdateEventDto;
