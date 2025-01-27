import jwt from 'jsonwebtoken'
import user from '../models/user.model.js'
import dotenv from 'dotenv'
dotenv.config()
export async function protectauth(req,res,next){
    try {
        const token = req.cookies.uid
        if(!token){
            return res.status(400).json({msg:'error please login'})
        }
        const decoed = jwt.verify(token,process.env.JWT_SECRET)
        const suser = await user.findById(decoed.id).select('-password')
        req.user = suser
        next()

    } catch (error) {
        console.log('error in the middle ware')
        return res.status(500).json({msg:'internal server errror'})
    }
}