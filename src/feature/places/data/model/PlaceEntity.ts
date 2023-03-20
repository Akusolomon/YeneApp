import { Schema, model } from 'mongoose';
const placeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },

  location:[Number],
  image:{
    type:String,
    required:true,
  },
  moreImages:[String],
  description:String

});

export const PlaceEntity = model('Place', placeSchema);
