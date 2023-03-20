import { Schema, model } from 'mongoose';

const chatSchema = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    conversation_id: { type: String, required: true },
    type: { type: String, default: 'text' },
    seen: { type: Boolean, default: 'false' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const ChatEntity = model('Chat', chatSchema);

chatSchema.virtual('sender', {
  ref: 'User',
  localField: 'from',
  foreignField: '_id',
  justOne: true,
});
chatSchema.virtual('reciever', {
  ref: 'User',
  localField: 'to',
  foreignField: '_id',
  justOne: true,
});
