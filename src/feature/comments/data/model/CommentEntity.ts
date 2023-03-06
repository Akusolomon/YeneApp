import { Schema, model } from 'mongoose';
const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commentedOn: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Event', 'Moment'],
  },
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
  replay: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      body: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const CommentEntity = model('Comment', commentSchema);
