import SavedJob from '../models/savedJobModel.js';
import Job from '../models/jobModel.js';

// Save a job
export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.userId;

    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already saved
    const existingSave = await SavedJob.findOne({ userId, jobId });
    if (existingSave) {
      return res.status(400).json({ message: 'Job already saved' });
    }

    // Create saved job
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

// Get all saved jobs for a user
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

    // Filter out saved jobs where the job has been deleted
    const validSavedJobs = savedJobs.filter(saved => saved.jobId !== null);

    res.json(validSavedJobs);
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ message: 'Failed to fetch saved jobs' });
  }
};

// Unsave/remove a job
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

// Check if a job is saved
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

// Get saved job IDs for user (for quick checking)
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
