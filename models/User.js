const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    googleId:{
        required:true,
        type:String
    },
    displayName:{
        required:true,
        type:String
    },
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        required:true,
        type:String
    },
    image:{
        type:String
    },
    createdAt:{
        default:Date.now,
        type:Date
    }
})

module.exports=mongoose.model('User',UserSchema)