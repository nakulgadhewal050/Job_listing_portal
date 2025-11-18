import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    fullname: {
        type: String
    },
    role: {
        type: String,
        default: 'employer'
    },
    companyName: {
        type: String
    },
    companyWebsite: {
        type: String
    },
    companyDescription: {
        type: String
    },
    contactPhone: {
        type: String
    },
    contactEmail: {
        type: String
    },
    avatarUrl: {
        type: String
    }
}, { timestamps: true });

const EmployerProfile = mongoose.model('EmployerProfile', employerProfileSchema);

export default EmployerProfile;
