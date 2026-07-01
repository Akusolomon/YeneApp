"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EventRepository = void 0;
var UserEntity_1 = require("./../../users/data/model/UserEntity");
var CheckFriend_1 = require("./../../users/data/CheckFriend");
var ValidationException_1 = require("src/util/exception/ValidationException");
var DataNotFoundException_1 = require("src/util/exception/DataNotFoundException");
var AuthenticatedUser_1 = require("src/feature/users/domain/AuthenticatedUser");
var EventEntity_1 = require("./model/EventEntity");
var Feature_1 = require("src/util/API/Feature");
var SystemErrorException_1 = require("src/util/exception/SystemErrorException");
var EventRepository = /** @class */ (function () {
    function EventRepository() {
        this.authUser = AuthenticatedUser_1.AuthenticatedUser.getInstance();
    }
    EventRepository.prototype.filterObj = function (obj) {
        var allowedfield = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            allowedfield[_i - 1] = arguments[_i];
        }
        var newObj = {};
        Object.keys(obj).forEach(function (el) {
            if (allowedfield.includes(el)) {
                newObj[el] = obj[el];
            }
        });
        return newObj;
    };
    EventRepository.prototype.createEvent = function (event, profile, images) {
        return __awaiter(this, void 0, void 0, function () {
            var img_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.profile = profile.filename;
                        event.user = this.authUser.userId;
                        if (new Date(event.startDate) > new Date(event.endDate))
                            throw new ValidationException_1.ValidationException('Please check ur Date'); //|| (new Date(Date.now()) < new Date(event.startDate) && Date.now() ) ))
                        if (images) {
                            img_1 = [];
                            images.forEach(function (el) {
                                console.log(el.filename);
                                img_1.push(el.filename);
                            });
                            event.images = img_1;
                        }
                        return [4 /*yield*/, EventEntity_1.EventEntity.create(event)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventRepository.prototype.addImage = function (id, files) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EventEntity_1.EventEntity.findById(id)];
                    case 1:
                        event = _a.sent();
                        if (!event || !(event.user == this.authUser.userId)) {
                            throw new ValidationException_1.ValidationException('Event Not Found or Not Allowed');
                        }
                        event.images.push(files);
                        return [4 /*yield*/, event.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventRepository.prototype.updateEvent = function (id, event) {
        return __awaiter(this, void 0, void 0, function () {
            var fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fields = this.filterObj(event, 'title', 'privacy', 'type', 'startDate', 'endDate', 'city', 'venue', 'fee', 'profile', 'location');
                        return [4 /*yield*/, EventEntity_1.EventEntity.findByIdAndUpdate(id, fields)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventRepository.prototype.getEvents = function (query, deleted) {
        return __awaiter(this, void 0, void 0, function () {
            var user_1, getEvent, Event, data, filteredData, i, found, _loop_1, i, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, UserEntity_1.UserEntity.findById(this.authUser.userId)];
                    case 1:
                        user_1 = _a.sent();
                        console.log(new Date().getFullYear() - new Date(user_1.dateOfBirth).getFullYear());
                        getEvent = EventEntity_1.EventEntity.find({
                            city: user_1.city,
                            age: {
                                $lte: new Date().getFullYear() - new Date(user_1.dateOfBirth).getFullYear()
                            }
                        })
                            .populate('comments')
                            .populate('likes')
                            .populate('eventgoing');
                        // getEvent.forEach(el => console.log(el.user));
                        if (deleted)
                            getEvent = EventEntity_1.EventEntity.find({
                                active: false
                            });
                        Event = new Feature_1.APIFeatures(getEvent, query)
                            .filter()
                            .search()
                            .sort()
                            .limitFields()
                            .paginate();
                        return [4 /*yield*/, Event.query];
                    case 2:
                        data = _a.sent();
                        filteredData = [];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < data.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, CheckFriend_1.checkFriend(data[i].user)];
                    case 4:
                        found = _a.sent();
                        if (!found && data[i].privacy) {
                            console.log('privacy');
                            if (this.authUser.userId == data[i].user)
                                filteredData.push(JSON.parse(JSON.stringify(data[i])));
                            return [3 /*break*/, 5];
                        }
                        else {
                            console.log('pub');
                            filteredData.push(JSON.parse(JSON.stringify(data[i])));
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        _loop_1 = function (i) {
                            var goingFriends = [];
                            filteredData[i].eventgoing.forEach(function (el) {
                                if (user_1.friends.includes(el.user._id)) {
                                    goingFriends.push(el.user);
                                }
                            });
                            filteredData[i]['goo'] = goingFriends;
                        };
                        // filteredData = JSON.parse(JSON.stringify(filteredData));
                        for (i = 0; i < filteredData.length; i++) {
                            _loop_1(i);
                        }
                        console.log(filteredData);
                        return [2 /*return*/, filteredData];
                    case 7:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw new SystemErrorException_1.SystemErrorException();
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    EventRepository.prototype.deleteEvent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EventEntity_1.EventEntity.findById(id)];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            throw new DataNotFoundException_1.DataNotFoundException('Event Not Found');
                        }
                        found.active = false;
                        return [4 /*yield*/, found.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventRepository.prototype.getEventById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EventEntity_1.EventEntity.findById(id)
                            .populate('likes')
                            .populate('moments')];
                    case 1:
                        event = _a.sent();
                        if (!event)
                            throw new DataNotFoundException_1.DataNotFoundException('Event Not Found');
                        return [2 /*return*/, event];
                }
            });
        });
    };
    return EventRepository;
}());
exports.EventRepository = EventRepository;
