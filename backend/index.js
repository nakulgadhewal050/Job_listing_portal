import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import cookieParser from "cookie-parser";
import connectDB from './config/db.js';
import authRouter from './Router/authRoute.js';
import profileRouter from './Router/profileRoute.js';
import jobRouter from './Router/jobRoute.js';
import applicationRouter from './Router/applicationRoute.js';
import savedJobRouter from './Router/savedJobRoute.js';
import cors from 'cors';
import userRouter from './Router/userRoute.js';


app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS configuration for production
app.use(cors({
    origin: ['https://job-listing-portal-frontend-9tvf.onrender.com', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

console.log('CORS configured for:', 'https://job-listing-portal-frontend-9tvf.onrender.com');

app.use("/api/auth",authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/saved-jobs', savedJobRouter);
app.use('/uploads', express.static('uploads'));
app.use("/api/user",userRouter);

app.get('/', (req, res)=> {
    res.send("server started")
})


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})