import * as crypto from 'crypto';
import { IsEmail } from 'class-validator';
import { Schema, model, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'user must have FirstName'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'user must have LastName'],
    },
    phone: {
      type: String,
      required: [true, 'user must have phone'],
    },

    companyName: { type: String, trim: true },
    isVarified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      // unique: true,
      // trim: true,
      // required: true,
    },
    userName: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be greaterthan 8'],
      select: false,
    },
    profile: { type: String },
    city: {
      type: String,
      required: [true, 'User Must have City'],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    bio: String,
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
    
      },
    ],
    interestedIn: [String],
    blockedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        
      },
    ],
    role: {
      type: String,
      enum: ['USER', 'PLACE'],
      required: [true, 'a user Must have a Role'],
    },
    code: Number,
    passwordChangedAt: Date,
    passwordResetExpires: Date,
    passwordResetToken: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
userSchema.pre<any>('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  // this.confirmPassword = undefined
});
userSchema.pre<any>(/^find/, function(next) {
  if (this._conditions.active == false) {
    this.find({ active: { $ne: true } });
    next();
  } else {
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
  localField: '_id',
});
userSchema.virtual('friendRequest', {
  ref: 'FriendRequest',
  foreignField: 'receiver',
  localField: '_id',
});
userSchema.virtual('interested', {
  ref: 'Category',
  foreignField: 'name',
  localField: 'interestedIn',
});
userSchema.virtual('going', {
  ref: 'EventGoing',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('moment', {
  ref: 'Moment',
  foreignField: 'user',
  localField: '_id',
});
//Instance Method(UserSchema)
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

export const UserEntity = model('User', userSchema);
