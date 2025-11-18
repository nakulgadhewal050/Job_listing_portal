import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import streamifier from 'streamifier'

const requiredEnv = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']
const missingEnv = requiredEnv.filter((key) => !process.env[key])
if (missingEnv.length) {
    console.warn(`Cloudinary: missing environment variables -> ${missingEnv.join(', ')}`)
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const deleteLocalFileIfPresent = (filePath) => {
    if (!filePath) return
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
    } catch (err) {
        console.warn('Cloudinary: failed to remove local file', err)
    }
}

const uploadOnCloudinary = async (file, options = {}) => {
    if (!file) throw new Error('Cloudinary: file payload missing')

    const uploadOptions = { folder: 'job-portal', resource_type: 'auto', ...options }

    try {
        if (file.path) {
            const result = await cloudinary.uploader.upload(file.path, uploadOptions)
            deleteLocalFileIfPresent(file.path)
            return result.secure_url
        }

        if (file.buffer) {
            return await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(result.secure_url)
                })

                streamifier.createReadStream(file.buffer).pipe(uploadStream)
            })
        }

        throw new Error('Cloudinary: unsupported file format')
    } catch (error) {
        deleteLocalFileIfPresent(file.path)
        console.error('Cloudinary upload failed', error)
        throw error
    }
}

export default uploadOnCloudinary