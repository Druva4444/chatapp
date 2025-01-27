import user from "../models/user.model.js";
import messege from "../models/messege.model.js";
export async function createmessege(req,res){
const {text,receiver} = req.body
try {
    const user = req.user._id
    const mesg = await messege.create({text,receiver,user})
    return res.status(200).json({msg:'messege created'})
} catch (error) {
    console.log('error in creating messeg')
    return res.status(500).json({msg:'internal server error'})
}
}
export async function getchat(req,res){
    const id = req.params.id;
    try {
        const loginuser = req.user._id
        const msgs = await messege.find({$or:[{$and:[{sender:loginuser},{receiver:id}]},{$and:[{sender:id},{receiver:loginuser}]}]})
        return res.status(200).json({messeges:msgs})
    } catch (error) {
        console.log('eoor in fetching chat')
        return res.status(500).json({msg:'internal server error'})
    }
}
export async function getusers(req,res){
    try {
        const loginuser = req.user._id
        const users = await user.find({ _id: { $ne: loginuser } });
        
        return res.status(200).json({users:users})
    } catch (error) {
        console.log('eoor in fetching users')
        return res.status(500).json({msg:'internal server error'})
    }
}