import { Schema, model } from 'mongoose';
const inviteSchema = new Schema({
  invitor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  invited: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//index
inviteSchema.index({ invitor: 1, invited: 1, event: 1 }, { unique: true });
export const InviteEntity = model('Invite', inviteSchema);
