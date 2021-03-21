const express = require('express')
const router=express.Router();
const {ensureAuth,ensureGuest} =require('../middleware/auth')
const Story = require("../models/Story")

//@descp : login/landing page
//@route : /
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})

//@descp : Dashboard
//@route : /dashboard
router.get('/dashboard',ensureAuth,async (req,res)=>{
    try {
        const stories=await Story.find({user:req.user.id}).lean()
        res.render('dashboard',{
            name:req.user.firstName,
            stories
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
    
})

module.exports =router