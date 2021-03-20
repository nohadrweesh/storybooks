const express = require('express')
const router=express.Router();

//@descp : login/landing page
//@route : /
router.get('/',(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})

//@descp : Dashboard
//@route : /dashboard
router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

module.exports =router