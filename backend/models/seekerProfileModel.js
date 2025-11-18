import mongoose from "mongoose";

const seekerProfileSchema = new mongoose.Schema({
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
        default: 'seeker'
    },
    location: {
        type: String
    },
    headline: {
        type: String
    },
    resumeUrl: {
        type: String
    },
    // Academic Details
    degree: {
        type: String
    },
    institution: {
        type: String
    },
    fieldOfStudy: {
        type: String
    },
    graduationYear: {
        type: String
    },
    cgpa: {
        type: String
    },
    // Work Experience
    experiences: [{
        jobTitle: {
            type: String
        },
        company: {
            type: String
        },
        location: {
            type: String
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        currentlyWorking: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }]
}, { timestamps: true });

const SeekerProfile = mongoose.model('SeekerProfile', seekerProfileSchema);

export default SeekerProfile;
