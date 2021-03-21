const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
        trim:true
    },
    body:{
        required:true,
        type:String        
    },
    status:{
        required:true,
        type:String,
        default:'public',
        enum:['public','private']
    },
    user:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        default:Date.now,
        type:Date
    }
})

module.exports=mongoose.model('Story',StorySchema)