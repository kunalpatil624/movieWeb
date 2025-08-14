import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './utils/DB.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js" 

const app = express();
const port = 3000;

app.use(express.json());
app.use(clerkMiddleware())
app.use(cors());

app.get("/", (req, res) => res.send("Server is live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));

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