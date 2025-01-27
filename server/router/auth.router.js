import express from 'express'
import {signin,signup,logout, updateprofilepic} from '../controllers/auth.controller.js'
import { protectauth } from '../middleware/auth.middleware.js';
const router = express.Router()
router.post('/signup',signup);
router.post('/signin',signin)
router.get('/logout',logout)
router.post('/updateprofile',protectauth,updateprofilepic)
export default router