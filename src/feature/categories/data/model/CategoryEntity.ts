import { Schema, model } from 'mongoose';
const categorySchema = new Schema({
  type: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
  },
  icon: {
    type: String,
  },
});

export const CategoryEntity = model('Category', categorySchema);
