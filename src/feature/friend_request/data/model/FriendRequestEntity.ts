import { Schema, model } from 'mongoose';
const friendRequestSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

export const FriendRequestEntity = model('FriendRequest', friendRequestSchema);
