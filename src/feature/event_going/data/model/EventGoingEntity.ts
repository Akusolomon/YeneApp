import { Schema, model } from 'mongoose';
import { randomBytes } from 'crypto';
const eventGoingSchema = new Schema({
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
  ticketNo: {
    type: String,
  },
  isAttended: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

eventGoingSchema.pre<any>(/^find/, function(next) {
  this.populate({
    path: 'user',
  });
  next();
});

export const EventGoingEntity = model('EventGoing', eventGoingSchema);

// eventGoingSchema.methods.createTicketNo = function () {
//     const resetToken = randomBytes(32).toString('hex') + Date.now().toString()
//     return resetToken
//   }
