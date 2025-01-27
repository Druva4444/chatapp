import user from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cloudinary from '../lib/cloudinary.js'
dotenv.config()
export async function signup(req,res){
    const {name,email,password} = req.body;

    try {
        if(!email || !password ||!name){
            return res.status(400).send("All input is required")
        }
        const oldUser = await user.findOne({email});
        if(oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }           
        const newUser = await user.create({name,email,password});
        return res.status(201).json(newUser);
    } catch (error) {
        console.log('error in creating user',error);
        return res.status(500).json(error);
    }
}
export async function signin(req,res){
    const {email,password}=req.body;
    try {
        if(!email || !password ){
            return res.status(400).send("All input is required")
        }
        const oldUser = await user.findOne({email,password});
        if(!oldUser)
            return res.status(400).json({message:"User does not exist"});
        const token = jwt.sign({id:oldUser._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('uid',token,{maxAge:1000*60*60*24*7})
        return res.status(200).json(oldUser);
    } catch (error) {
        console.log('error in logging user',error);
        return res.status(500).json(error);
    }
}
export async function logout(req,res){
    try {
        const cookie = req.cookies.uid
        if(!cookie)
            return res.status(400).json({msg:'User not logged in'})
        res.clearCookie('uid')  

        return res.status(200).json({message:"User logged out"});
    } catch (error) {
        console.log('error in logging out user',error);
        return res.status(500).json(error);
    }
}
export async function updateprofilepic(req,res){
    const {image} = req.body
    try {
        const user = req.user
        if(!user)
            return res.status(400).json({msg:'please login '})
        const response = await cloudinary.uploader.upload(image,{folder:'profilepic'})
        user.profilepic = response.secure_url
        await user.save()
        return res.status(200).json({msg:'pic updated succesfully '})
    } catch (error) {
        console.log('error in updating the pic')
        return res.status(500).json({msg:'internal server error'})
    }
}