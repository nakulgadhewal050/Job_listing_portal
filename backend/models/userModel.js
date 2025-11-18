import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ['seeker', 'employer'],
        required: true
    },
    avatarUrl: { 
        type: String 
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;