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
exports.UserEntity = void 0;
var crypto = require("crypto");
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'user must have FirstName'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'user must have LastName']
    },
    phone: {
        type: String,
        required: [true, 'user must have phone']
    },
    companyName: { type: String, unique: true, trim: true },
    isVarified: {
        type: Boolean,
        "default": false
    },
    email: {
        type: String
    },
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be greaterthan 8'],
        select: false
    },
    profile: { type: String },
    city: {
        type: String,
        required: [true, 'User Must have City']
    },
    bio: String,
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        },
    ],
    blockedUsers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        },
    ],
    role: {
        type: String,
        "enum": ['USER', 'PLACE'],
        required: [true, 'a user Must have a Role']
    },
    code: Number,
    passwordChangedAt: Date,
    passwordResetExpires: Date,
    passwordResetToken: String,
    active: {
        type: Boolean,
        "default": false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!this.isModified('password'))
                        return [2 /*return*/, next()];
                    _a = this;
                    return [4 /*yield*/, bcrypt.hash(this.password, 12)];
                case 1:
                    _a.password = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
userSchema.pre(/^find/, function (next) {
    if (this._conditions.active == false) {
        this.find({ active: { $ne: true } });
        next();
    }
    else {
        this.find({ active: { $ne: false } });
        next();
    }
});
//Methods
// userSchema.methods.generateCode = function(){
//   const min =100000;
//   const max = 999999;
//   this.code = Math.floor(Math.random() * (max - min +1)) + min
// }
//Virtuals
userSchema.virtual('event', {
    ref: 'Event',
    foreignField: 'user',
    localField: '_id'
});
userSchema.virtual('friendRequest', {
    ref: 'FriendRequest',
    foreignField: 'receiver',
    localField: '_id'
});
userSchema.virtual('going', {
    ref: 'EventGoing',
    foreignField: 'user',
    localField: '_id'
});
userSchema.virtual('moment', {
    ref: 'Moment',
    foreignField: 'user',
    localField: '_id'
});
//Instance Method(UserSchema)
userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.compare(candidatePassword, userPassword)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
userSchema.methods.createPasswordResetToken = function () {
    var resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
exports.UserEntity = mongoose_1.model('User', userSchema);
