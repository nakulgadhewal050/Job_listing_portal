// controllers/profileController.js
import User from '../models/userModel.js'
import SeekerProfile from '../models/seekerProfileModel.js'
import EmployerProfile from '../models/employerProfileModel.js'
import uploadOnCloudinary from '../utils/cloudinary.js'

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    
    let profileData = { ...user.toObject() }
    
    if (user.role === 'seeker') {
      const seekerProfile = await SeekerProfile.findOne({ userId: user._id })
      if (seekerProfile) {
        profileData = { ...profileData, ...seekerProfile.toObject() }
      }
    } else if (user.role === 'employer') {
      const employerProfile = await EmployerProfile.findOne({ userId: user._id })
      if (employerProfile) {
        profileData = { ...profileData, ...employerProfile.toObject() }
      }
    }
    
    res.json(profileData)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Failed to load profile' })
  }
}

export const updateMe = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    
    const { fullname, phone } = req.body
    
    // Update base user fields
    if (fullname) user.fullname = fullname
    if (phone) user.phone = phone
    
    // Handle photo upload
    if (req.file) {
      const avatarUrl = await uploadOnCloudinary(req.file)
      user.avatarUrl = avatarUrl
    }
    
    await user.save()
    
    // Update role-specific profile
    if (user.role === 'seeker') {
      const { location, headline, resumeUrl, degree, institution, fieldOfStudy, graduationYear, cgpa, experiences } = req.body
      
      let seekerProfile = await SeekerProfile.findOne({ userId })
      if (!seekerProfile) {
        seekerProfile = new SeekerProfile({ userId })
      }
      
      seekerProfile.fullname = user.fullname
      seekerProfile.role = user.role
      seekerProfile.email = user.email
      seekerProfile.phone = user.phone
      if (location !== undefined) seekerProfile.location = location
      if (headline !== undefined) seekerProfile.headline = headline
      if (resumeUrl !== undefined) seekerProfile.resumeUrl = resumeUrl
      if (degree !== undefined) seekerProfile.degree = degree
      if (institution !== undefined) seekerProfile.institution = institution
      if (fieldOfStudy !== undefined) seekerProfile.fieldOfStudy = fieldOfStudy
      if (graduationYear !== undefined) seekerProfile.graduationYear = graduationYear
      if (cgpa !== undefined) seekerProfile.cgpa = cgpa
      if (experiences !== undefined) seekerProfile.experiences = experiences
      
      await seekerProfile.save()
    } else if (user.role === 'employer') {
      const { companyName, companyWebsite, companyDescription, contactPhone, contactEmail } = req.body
      
      let employerProfile = await EmployerProfile.findOne({ userId })
      if (!employerProfile) {
        employerProfile = new EmployerProfile({ userId })
      }
      
      employerProfile.fullname = user.fullname
      employerProfile.role = user.role
      if (companyName !== undefined) employerProfile.companyName = companyName
      if (companyWebsite !== undefined) employerProfile.companyWebsite = companyWebsite
      if (companyDescription !== undefined) employerProfile.companyDescription = companyDescription
      if (contactPhone !== undefined) employerProfile.contactPhone = contactPhone
      if (contactEmail !== undefined) employerProfile.contactEmail = contactEmail
      
      // Avatar for employer
      if (req.file) {
        employerProfile.avatarUrl = user.avatarUrl
      }
      
      await employerProfile.save()
    }
    
    // Return updated data
    const updatedUser = await User.findById(userId).select('-password')
    let responseData = { ...updatedUser.toObject() }
    
    if (user.role === 'seeker') {
      const seekerProfile = await SeekerProfile.findOne({ userId })
      if (seekerProfile) responseData = { ...responseData, ...seekerProfile.toObject() }
    } else if (user.role === 'employer') {
      const employerProfile = await EmployerProfile.findOne({ userId })
      if (employerProfile) responseData = { ...responseData, ...employerProfile.toObject() }
    }
    
    res.status(200).json({ message: 'Profile updated successfully', user: responseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update profile' })
  }
}


export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    
    // Upload resume to Cloudinary
    const resumeUrl = await uploadOnCloudinary(req.file, { 
      folder: 'job-portal/resumes',
      resource_type: 'raw' // For non-image files like PDFs
    })
    
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    
    if (user.role === 'seeker') {
      let seekerProfile = await SeekerProfile.findOne({ userId: req.userId })
      if (!seekerProfile) {
        seekerProfile = new SeekerProfile({ userId: req.userId })
      }
      seekerProfile.resumeUrl = resumeUrl
      await seekerProfile.save()
    }
    
    res.json({ resumeUrl })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Failed to upload resume' })
  }
}

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No photo uploaded' })
    const avatarUrl = await uploadOnCloudinary(req.file)
    
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    
    user.avatarUrl = avatarUrl
    await user.save()
    
    // Also update employer profile if employer
    if (user.role === 'employer') {
      let employerProfile = await EmployerProfile.findOne({ userId: req.userId })
      if (!employerProfile) {
        employerProfile = new EmployerProfile({ userId: req.userId })
      }
      employerProfile.avatarUrl = avatarUrl
      await employerProfile.save()
    }
    
    res.json({ avatarUrl, user: user.toObject() })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Failed to upload photo' })
  }
}
