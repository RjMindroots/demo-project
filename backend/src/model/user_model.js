import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {type: String},
    mobile_number: {type: String},
    email: {type: String, unique: true, required: true},
    password: {type: String},
    status:{type: Boolean, default: true},
    role: {type: String, default: 'user'}
}, {timestamps: true})

export default mongoose.model('User', userSchema, 'users')