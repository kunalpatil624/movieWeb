import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './utils/DB.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js" 
import userRouter from './router/userRouter.js'
import cookieParser from 'cookie-parser';
import movieRouter from './router/movieRouter.js'
import requestRouter from './router/requestRouter.js'
import superAdminRouter from './router/superAdminRouter.js'
import theaterRouter from './router/theaterRouter.js'
import showRouter from './router/showRouter.js'
import bookingsRouter from './router/bookingsRouter.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use(clerkMiddleware())
app.use(cors({
    origin: ["http://localhost:5173" ,"http://localhost:5174", "https://movie-web-user-frontend.vercel.app/"],
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Server is live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/user", userRouter);
app.use("/api/request", requestRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theaters", theaterRouter);
app.use("/api/shows", showRouter);
app.use("/api/admin", movieRouter);
app.use("/api/superadmin", superAdminRouter);
app.use("/api/bookings", bookingsRouter);

const startServer = async()=> {
    try {
        await connectDB();
        app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

startServer();