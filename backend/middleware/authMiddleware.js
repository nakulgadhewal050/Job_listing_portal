import jwt from 'jsonwebtoken';


export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('Auth middleware - Token present:', !!token);
        if (!token){
            console.log('No token in cookies');
            return res.status(401).json({ message: 'token not found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            console.log('Token verification failed');
            return res.status(401).json({ message: 'Token not verified' });
        }

        console.log('Token verified, userId:', decoded.userId);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log('Auth middleware error:', error.message);
        return res.status(401).json({ message: 'Token invalid' });
    }
}