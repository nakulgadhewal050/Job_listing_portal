import express, { urlencoded } from 'express';
const app = express();
const PORT = 3000;
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from './config/db.js';
import authRouter from './Router/authRoute.js';
import cors from 'cors';


app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ' http://localhost:5173',
    credentials: true,
}))

app.use("/api/auth",authRouter);

app.get('/', (req, res)=> {
    res.send("server started")
})


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})