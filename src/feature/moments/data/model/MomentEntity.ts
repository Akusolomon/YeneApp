import { Schema, model } from 'mongoose';
const momentSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    media: [String],
    post: { type: String, trim: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
    privacy: {
      type: Boolean,
      default: false,
    },
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

//virtuals
momentSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'commentedOn',
  localField: '_id',
});
momentSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'likedOn',
  localField: '_id',
});


export const MomentEntity = model('Moment', momentSchema);
