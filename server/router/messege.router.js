import express from 'express'
import { protectauth } from '../middleware/auth.middleware';
import {createmessege,getchat,getusers} from '../controllers/messege.controller'
const router = express.Router()
router.post('/createmessege',protectauth,createmessege);
router.get('/chat/:id',protectauth,getchat)
router.get('/getusers',protectauth,getusers)

export default router