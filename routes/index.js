const express = require('express')
const router=express.Router();
const {ensureAuth,ensureGuest} =require('../middleware/auth')

//@descp : login/landing page
//@route : /
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})

//@descp : Dashboard
//@route : /dashboard
router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('dashboard')
})

module.exports =router