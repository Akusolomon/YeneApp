import { Schema,model } from 'mongoose';
const chatSchema = new Schema({

    user:String

})

export const ChatSchema = model("Chat",chatSchema)