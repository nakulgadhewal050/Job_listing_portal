import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
        default: 'pending'
    },
    coverLetter: {
        type: String
    },
    resumeUrl: {
        type: String
    },
    notes: {
        type: String
    }
}, { timestamps: true });

applicationSchema.index({ jobId: 1, seekerId: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
