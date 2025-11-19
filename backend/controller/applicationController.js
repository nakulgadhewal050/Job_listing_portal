import Application from '../models/applicationModel.js'
import Job from '../models/jobModel.js'
import SeekerProfile from '../models/seekerProfileModel.js'

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body
    const seekerId = req.userId

    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required' })
    }

    // Check if job exists
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.status !== 'active') {
      return res.status(400).json({ message: 'This job is no longer accepting applications' })
    }

    // Check if already applied
    const existingApplication = await Application.findOne({ jobId, seekerId })
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' })
    }

    // Get seeker profile for resume
    const seekerProfile = await SeekerProfile.findOne({ userId: seekerId })
    
    const application = await Application.create({
      jobId,
      seekerId,
      employerId: job.employerId,
      coverLetter,
      resumeUrl: seekerProfile?.resumeUrl || ''
    })

    res.status(201).json({ message: 'Application submitted successfully', application })
  } catch (error) {
    console.error('Apply for job error:', error)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already applied for this job' })
    }
    res.status(500).json({ message: 'Failed to submit application' })
  }
}

// Get my applications (for job seekers)
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ seekerId: req.userId })
      .populate('jobId', 'jobTitle location salaryRange jobType status')
      .populate('employerId', 'fullname email')
      .sort({ createdAt: -1 })
    
    res.json(applications)
  } catch (error) {
    console.error('Get my applications error:', error)
    res.status(500).json({ message: 'Failed to fetch applications' })
  }
}

// Get applications for a job (for employers)
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params
    
    // Verify job belongs to employer
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    
    if (job.employerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view these applications' })
    }

    const applications = await Application.find({ jobId })
      .populate('seekerId', 'fullname email phone')
      .sort({ createdAt: -1 })
    
    res.json(applications)
  } catch (error) {
    console.error('Get job applications error:', error)
    res.status(500).json({ message: 'Failed to fetch applications' })
  }
}

// Get all applications for employer
export const getEmployerApplications = async (req, res) => {
  try {
    const applications = await Application.find({ employerId: req.userId })
      .populate('jobId', 'jobTitle location jobType salaryRange')
      .populate('seekerId', 'fullname email phone')
      .sort({ createdAt: -1 })
    
    res.json(applications)
  } catch (error) {
    console.error('Get employer applications error:', error)
    res.status(500).json({ message: 'Failed to fetch applications' })
  }
}

// Update application status (for employers)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status, notes } = req.body

    if (!status) {
      return res.status(400).json({ message: 'Status is required' })
    }

    const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const application = await Application.findById(id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    // Verify employer owns this application
    if (application.employerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this application' })
    }

    application.status = status
    if (notes !== undefined) application.notes = notes
    
    await application.save()

    res.json({ message: 'Application status updated', application })
  } catch (error) {
    console.error('Update application status error:', error)
    res.status(500).json({ message: 'Failed to update application' })
  }
}

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params
    
    const application = await Application.findById(id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    // Only seeker can delete their own application
    if (application.seekerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this application' })
    }

    await Application.findByIdAndDelete(id)

    res.json({ message: 'Application withdrawn successfully' })
  } catch (error) {
    console.error('Delete application error:', error)
    res.status(500).json({ message: 'Failed to delete application' })
  }
}

// Check if user has applied for a job
export const checkApplicationStatus = async (req, res) => {
  try {
    const { jobId } = req.params
    
    const application = await Application.findOne({ 
      jobId, 
      seekerId: req.userId 
    })
    
    if (application) {
      res.json({ hasApplied: true, application })
    } else {
      res.json({ hasApplied: false })
    }
  } catch (error) {
    console.error('Check application status error:', error)
    res.status(500).json({ message: 'Failed to check application status' })
  }
}
