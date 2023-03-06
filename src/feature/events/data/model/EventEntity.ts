import { AuthenticatedUser } from './../../../users/domain/AuthenticatedUser';
import { checkFriend } from './../../../users/data/CheckFriend';
import { Schema, model } from 'mongoose';
import * as mnd from 'mongodb';
const eventSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Event Must Have Title'],
    },
    code: {
      type: Number,
      // unique: true,
      // required: [true, 'Event Must Have code'],
    },
    privacy: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: [true, 'Event Must Have Type'],
    },
    startDate: {
      type: Date,
      required: [true, 'event Must Have startDate'],
    },
    endDate: {
      type: Date,
      required: [true, 'event Must Have endDate'],
    },
    city: {
      type: String,
      required: [true, 'event Must Have City'],
    },
    venue: {
      type: String,
      default: 'INFINITY',
      // required: [true, ' an event Must Have a Venue'],
    },
    fee: {
      type: Number,
      default: 0,
    },
    profile: {
      type: String,
      required: true,
    },
    images: [String],
    // location:[Number]
    description: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
eventSchema.pre<any>(/^find/, function(next) {
  if (this._conditions.active == false) {
    this.find({ active: { $ne: true } });
    next();
  } else {
    this.find({ active: { $ne: false } });
    next();
  }
});

//virtuals
eventSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'commentedOn',
  localField: '_id',
});
eventSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'likedOn',
  localField: '_id',
});

eventSchema.virtual('going', {
  ref: 'EventGoing',
  foreignField: 'event',
  localField: '_id',
});
eventSchema.index({ title: 'text', venue: 'text' });

export const EventEntity = model('Event', eventSchema);
