import express from 'express'
import connectDB from './lib/db.js'
import cookieParser from 'cookie-parser';
import authrouter from './router/auth.router.js'
import messegerouter from './router/messege.router.js'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:'http://localhost:5173', credentials: true}))
connectDB()
app.use('/api/auth',authrouter)
app.use('/api/chat',messegerouter)
app.listen(3000,()=>{console.log('Server is running on port 3000')})