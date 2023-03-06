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

export const EventGoingEntity = model('EventGoing', eventGoingSchema);
// eventGoingSchema.pre<any>("save",function(next){
//     if(this.fee)
//     this.ticketNo = this.createTicketNo()
// })

// eventGoingSchema.methods.createTicketNo = function () {
//     const resetToken = randomBytes(32).toString('hex') + Date.now().toString()
//     return resetToken
//   }
