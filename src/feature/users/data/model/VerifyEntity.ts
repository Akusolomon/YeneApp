import { Schema, model } from 'mongoose';

const verifySchema = new Schema({
  phone: String,
  code: Number,
});

export const VerifyEntity = model('Verify', verifySchema);
