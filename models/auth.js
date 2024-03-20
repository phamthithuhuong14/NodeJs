import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    fulname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: String
},
{
    timestamp: true
});
export const User = mongoose.model('users', UserSchema )