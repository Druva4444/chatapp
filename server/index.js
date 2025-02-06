import express from 'express'
import connectDB from './lib/db.js'
import cookieParser from 'cookie-parser';
import authrouter from './router/auth.router.js'
import messegerouter from './router/messege.router.js'
import cors from 'cors'
import {app,server,io} from './lib/socket.js'


app.use(express.json({ limit: "50mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({origin:'http://localhost:5173', credentials: true,}))
connectDB()
app.use('/api/auth',authrouter)
app.use('/api/chat',messegerouter)
server.listen(3000,()=>{console.log('Server is running on port 3000')})