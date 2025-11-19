import SavedJob from '../models/savedJobModel.js';
import Job from '../models/jobModel.js';


export const saveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.userId;

        if (!jobId) {
            return res.status(400).json({ message: 'Job ID is required' });
        }


        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }


        const existingSave = await SavedJob.findOne({ userId, jobId });
        if (existingSave) {
            return res.status(400).json({ message: 'Job already saved' });
        }

        const savedJob = await SavedJob.create({ userId, jobId });

        res.status(201).json({
            message: 'Job saved successfully',
            savedJob
        });
    } catch (error) {
        console.error('Save job error:', error);
        res.status(500).json({ message: 'Failed to save job' });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.userId;

        const savedJobs = await SavedJob.find({ userId })
            .populate({
                path: 'jobId',
                populate: {
                    path: 'employerId',
                    select: 'fullname email'
                }
            })
            .sort({ createdAt: -1 });

        const validSavedJobs = savedJobs.filter(saved => saved.jobId !== null);
        res.json(validSavedJobs);

    } catch (error) {
        console.error('Get saved jobs error:', error);
        res.status(500).json({ message: 'Failed to fetch saved jobs' });
    }
};

export const unsaveJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.userId;

        const savedJob = await SavedJob.findOneAndDelete({ userId, jobId });

        if (!savedJob) {
            return res.status(404).json({ message: 'Saved job not found' });
        }

        res.json({ message: 'Job removed from saved jobs' });
    } catch (error) {
        console.error('Unsave job error:', error);
        res.status(500).json({ message: 'Failed to unsave job' });
    }
};


export const checkIfSaved = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.userId;

        const savedJob = await SavedJob.findOne({ userId, jobId });

        res.json({ isSaved: !!savedJob });
    } catch (error) {
        console.error('Check saved job error:', error);
        res.status(500).json({ message: 'Failed to check saved status' });
    }
};

export const getSavedJobIds = async (req, res) => {
    try {
        const userId = req.userId;

        const savedJobs = await SavedJob.find({ userId }).select('jobId');
        const jobIds = savedJobs.map(saved => saved.jobId.toString());

        res.json(jobIds);
    } catch (error) {
        console.error('Get saved job IDs error:', error);
        res.status(500).json({ message: 'Failed to fetch saved job IDs' });
    }
};
