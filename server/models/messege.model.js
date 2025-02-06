import mongoose from 'mongoose'
const messegeSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    text:{
        type:String,
        required:true,
    }
},{timestamps:true})
const messege = mongoose.model('messege',messegeSchema)
export default messege