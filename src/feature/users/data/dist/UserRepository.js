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
exports.UserRepository = void 0;
var AuthenticatedUser_1 = require("./../domain/AuthenticatedUser");
var DataNotFoundException_1 = require("src/util/exception/DataNotFoundException");
var ValidationException_1 = require("src/util/exception/ValidationException");
var UserEntity_1 = require("./model/UserEntity");
var Feature_1 = require("src/util/API/Feature");
var SystemErrorException_1 = require("src/util/exception/SystemErrorException");
var UserRoles_1 = require("src/util/API/UserRoles");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        this.authUser = AuthenticatedUser_1.AuthenticatedUser.getInstance();
    }
    UserRepository.prototype.unBlock = function (id) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, err_1, newUser, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user.role == UserRoles_1.UserRoles.PLACE)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!user.companyName) {
                            throw new ValidationException_1.ValidationException('CompanyName Is Required');
                        }
                        return [4 /*yield*/, UserEntity_1.UserEntity.create(user)];
                    case 2:
                        newUser = _a.sent();
                        return [2 /*return*/, newUser];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw new ValidationException_1.ValidationException('Some Thing Went Wrong Please try Again');
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, UserEntity_1.UserEntity.create(user)];
                    case 5:
                        newUser = _a.sent();
                        return [2 /*return*/, newUser];
                    case 6:
                        err_2 = _a.sent();
                        console.log(err_2);
                        throw new ValidationException_1.ValidationException('Some Thing Went Wrong Please try Again');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.addProfile = function (add) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, UserEntity_1.UserEntity.findById(this.authUser.userId)];
                    case 1:
                        user = _a.sent();
                        if (add.bio) {
                            user.bio = add.bio;
                        }
                        if (add.email) {
                            user.bio = add.email;
                        }
                        if (add.profile) {
                            user.profile = add.profile;
                        }
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        throw new ValidationException_1.ValidationException('Some Thing Went Wrong Please try Again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.getMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findById(this.authUser.userId)
                            .populate({
                            path: 'friends',
                            select: 'firstName lastName',
                            populate: {
                                path: 'friends',
                                select: 'firstName lastName',
                                match: {
                                    _id: { $ne: this.authUser.userId }
                                }
                            }
                        })
                            .populate('event')
                            .populate('friendRequest')
                            .populate('going')
                            .populate('moment')];
                    case 1:
                        me = _a.sent();
                        return [2 /*return*/, me];
                }
            });
        });
    };
    UserRepository.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.authUser.role == 'ADMIN')) return [3 /*break*/, 2];
                        return [4 /*yield*/, UserEntity_1.UserEntity.findById(id)];
                    case 1:
                        user = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(this.authUser.role == 'USER')) return [3 /*break*/, 4];
                        return [4 /*yield*/, UserEntity_1.UserEntity.findById(this.authUser.userId)];
                    case 3:
                        user = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!user) {
                            throw new DataNotFoundException_1.DataNotFoundException('User Not Found');
                        }
                        user.active = false;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.getUsers = function (query, deleted) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userFeatures, data, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = UserEntity_1.UserEntity.find()
                            .populate('event')
                            .populate('friends');
                        if (deleted)
                            user = UserEntity_1.UserEntity.find({ active: false });
                        userFeatures = new Feature_1.APIFeatures(user, query)
                            .filter()
                            .search()
                            .sort()
                            .limitFields()
                            .paginate();
                        return [4 /*yield*/, userFeatures.query];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        err_4 = _a.sent();
                        throw new SystemErrorException_1.SystemErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.getBlockedUsers = function () {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.block = function (id) {
        //TODO You Can Only Block Your Friends
    };
    UserRepository.prototype.unFriend = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var friend, i, unfriend, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findById(this.authUser.userId)];
                    case 1:
                        friend = _a.sent();
                        if (!friend)
                            throw new DataNotFoundException_1.DataNotFoundException('User Not Found');
                        for (i = 0; i < friend.friends.length; i++) {
                            if (friend.friends[i] == id) {
                                console.log(friend.friends[i], '===', id);
                                friend.friends.splice(i, 1);
                            }
                        }
                        return [4 /*yield*/, UserEntity_1.UserEntity.findById(id)];
                    case 2:
                        unfriend = _a.sent();
                        if (!unfriend)
                            throw new DataNotFoundException_1.DataNotFoundException('User Not Found');
                        for (i = 0; i < unfriend.friends.length; i++) {
                            if (unfriend.friends[i] == this.authUser.userId) {
                                console.log('un', unfriend.friends[i], '==', this.authUser.userId);
                                unfriend.friends.splice(i, 1);
                            }
                        }
                        return [4 /*yield*/, friend.save()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, unfriend.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.forgetPassword = function (forgetPass) {
        return __awaiter(this, void 0, void 0, function () {
            var user, resetToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findOne(forgetPass)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new DataNotFoundException_1.DataNotFoundException("email doesnt exist");
                        }
                        resetToken = user.createPasswordResetToken();
                        return [4 /*yield*/, user.save({ validateBeforeSave: false })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.login = function (userloginDto) {
        return __awaiter(this, void 0, void 0, function () {
            var phone, password, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        phone = userloginDto.phone, password = userloginDto.password;
                        if (!phone || !password) {
                            throw new ValidationException_1.ValidationException("phone or Password Incorrect");
                        }
                        return [4 /*yield*/, UserEntity_1.UserEntity.findOne({
                                $or: [{ phone: phone }, { email: phone }]
                            }).select('+password')];
                    case 1:
                        user = _b.sent();
                        console.log(user);
                        _a = !user;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, user.correctPassword(password, user.password)];
                    case 2:
                        _a = !(_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            throw new ValidationException_1.ValidationException("phone or Password incorrect");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserRepository.prototype.getFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findById(this.authUser.userId).populate('friends')];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user.friends];
                }
            });
        });
    };
    UserRepository.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, Isfriends;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findById(id)
                            .populate('event')
                            .populate('moment')
                            .populate({
                            path: 'friends',
                            select: 'firstName lastName',
                            populate: {
                                path: 'friends',
                                select: 'firstName lastName',
                                match: {
                                    _id: { $ne: id }
                                }
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new ValidationException_1.ValidationException('User Not Found');
                        Isfriends = false;
                        if (user.friends.includes(this.authUser.userId)) {
                            Isfriends = true;
                        }
                        return [2 /*return*/, { user: user, Isfriends: Isfriends }];
                }
            });
        });
    };
    UserRepository.prototype.changePasswordAd = function (id, change) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findById(id).select('+password')];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser)
                            throw new DataNotFoundException_1.DataNotFoundException('user Not Found');
                        console.log(change.newPassword);
                        currentUser.password = change.newPassword;
                        return [4 /*yield*/, currentUser.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.changePic = function (id, profile) {
        return __awaiter(this, void 0, void 0, function () {
            var update_pic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findByIdAndUpdate(id, { profile: profile })];
                    case 1:
                        update_pic = _a.sent();
                        if (!update_pic)
                            throw new ValidationException_1.ValidationException('Cant find user');
                        return [2 /*return*/, 'Updated'];
                }
            });
        });
    };
    UserRepository.prototype.updateUser = function (update) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findById(this.authUser.userId)];
                    case 1:
                        user = _a.sent();
                        if (update.city) {
                            user.city = update.city;
                        }
                        if (update.userName) {
                            user.city = update.userName;
                        }
                        if (update.privacy) {
                            user.privacy = update.privacy;
                        }
                        if (update.phone) {
                            user.phone = update.phone;
                        }
                        if (update.email) {
                            user.email = update.email;
                        }
                        if (update.firstName) {
                            user.firstName = update.firstName;
                        }
                        if (update.lastName) {
                            user.lastName = update.lastName;
                        }
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.changePassword = function (change) {
        return __awaiter(this, void 0, Promise, function () {
            var currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findById(this.authUser.userId).select('+password')];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser)
                            throw new DataNotFoundException_1.DataNotFoundException('user Not Found');
                        return [4 /*yield*/, currentUser.correctPassword(change.currentPassword, currentUser.password)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new ValidationException_1.ValidationException('Current Password Doesnt match');
                        }
                        if (!(change.newPassword === change.confirmPassword))
                            throw new ValidationException_1.ValidationException('Password Doesnt match');
                        currentUser.password = change.newPassword;
                        return [4 /*yield*/, currentUser.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.changeUserPassword = function (id, change) {
        return __awaiter(this, void 0, Promise, function () {
            var currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserEntity_1.UserEntity.findById(id).select('+password')];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser)
                            throw new DataNotFoundException_1.DataNotFoundException('user Not Found');
                        currentUser.password = change.newPassword;
                        return [4 /*yield*/, currentUser.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
