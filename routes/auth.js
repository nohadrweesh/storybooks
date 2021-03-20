const express = require('express')
const passport = require('passport')
const router=express.Router();


//@descp : Auth with google
//@route : /auth/google
router.get('/google',passport.authenticate('google',{scope:['profile']}))


//@descp : Google Auth Callback
//@route : /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),
(req,res)=>{
    res.redirect('/dashboard')
}
)


//@descp : Logout User
//@route : /auth/logout
router.get('/logout',
(req,res)=>{
    req.logout()
    res.redirect('/')
}
)


module.exports =router