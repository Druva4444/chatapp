import express from 'express'
import { protectauth } from '../middleware/auth.middleware.js';
import {createmessege,getchat,getusers} from '../controllers/messege.controller.js'
const router = express.Router()
router.post('/createmessege',protectauth,createmessege);
router.get('/chat/:id',protectauth,getchat)
router.get('/getusers',protectauth,getusers)

export default router