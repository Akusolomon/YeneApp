import { Schema, model } from 'mongoose';
const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likedOn: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Event', 'Moment', 'Comment'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
likeSchema.index({ likedOn: 1, user: 1 }, { unique: true });

export const LikeEntity = model('Like', likeSchema);
