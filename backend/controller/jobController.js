import Job from '../models/jobModel.js'


export const createJob = async (req, res) => {
  try {
    const { jobTitle, description, qualifications, responsibilities, location, salaryRange, jobType } = req.body

    if (!jobTitle || !description || !location) {
      return res.status(400).json({ message: 'Job title, description, and location are required' })
    }

    const job = await Job.create({
      employerId: req.userId,
      jobTitle,
      description,
      qualifications,
      responsibilities,
      location,
      salaryRange,
      jobType
    })

    res.status(201).json({ message: 'Job created successfully', job })
  } catch (error) {
    console.error('Create job error:', error)
    res.status(500).json({ message: 'Failed to create job' })
  }
}


export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.userId }).sort({ createdAt: -1 })
    res.json(jobs)
  } catch (error) {
    console.error('Get jobs error:', error)
    res.status(500).json({ message: 'Failed to fetch jobs' })
  }
}


export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' })
      .populate('employerId', 'fullname email')
      .sort({ createdAt: -1 })
    res.json(jobs)
  } catch (error) {
    console.error('Get all jobs error:', error)
    res.status(500).json({ message: 'Failed to fetch jobs' })
  }
}


export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employerId', 'fullname email')
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    res.json(job)
  } catch (error) {
    console.error('Get job error:', error)
    res.status(500).json({ message: 'Failed to fetch job' })
  }
}


export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.employerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this job' })
    }

    const { jobTitle, description, qualifications, responsibilities, location, salaryRange, jobType, status } = req.body

    if (jobTitle !== undefined) job.jobTitle = jobTitle
    if (description !== undefined) job.description = description
    if (qualifications !== undefined) job.qualifications = qualifications
    if (responsibilities !== undefined) job.responsibilities = responsibilities
    if (location !== undefined) job.location = location
    if (salaryRange !== undefined) job.salaryRange = salaryRange
    if (jobType !== undefined) job.jobType = jobType
    if (status !== undefined) job.status = status

    await job.save()

    res.json({ message: 'Job updated successfully', job })
  } catch (error) {
    console.error('Update job error:', error)
    res.status(500).json({ message: 'Failed to update job' })
  }
}


export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.employerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this job' })
    }

    await Job.findByIdAndDelete(req.params.id)

    res.json({ message: 'Job deleted successfully' })
  } catch (error) {
    console.error('Delete job error:', error)
    res.status(500).json({ message: 'Failed to delete job' })
  }
}
