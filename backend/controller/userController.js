import User from "../models/userModel.js";



export const getCurrentUser = async (req, res) => {
    try {
        console.log('getCurrentUser called, userId from token:', req.userId);
        const userId = req.userId;
        if(!userId){
            console.log('No userId found in request');
            return res.status(400).json({message: "User ID not found"});
        }

        const user = await User.findById(userId).select('-password');
        if(!user){
            console.log('User not found in database');
            return res.status(404).json({message: "User not found"});
        }
        console.log('User found:', user.email);
        return res.status(200).json(user);
    } catch (error) {
         console.log('getCurrentUser error:', error);
         return res.status(500).json({message: ` getCurrentUser error: ${error}`});
    }
}