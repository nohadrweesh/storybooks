const express = require('express')
const router=express.Router();
const {ensureAuth} =require('../middleware/auth')
const Story = require("../models/Story")

//@descp : Show add page
//@route : /stories/add
router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add')
})


//@descp : process from dats
//@route : /stories
router.post('/',ensureAuth,async (req,res)=>{
    try {
        req.body.user=req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
        
    } catch (error) {
        console.log(error)
        res.render('error/500')
        
    }
})

//@descp : Show public stories page
//@route : /stories
router.get('/',ensureAuth,async (req,res)=>{
    try {
        res.render('stories/index',{
            stories:await Story.find({status:'public'})
            .populate('user')
            .sort({createdAt:'DESC'})
            .lean()
        })
        
    } catch (error) {
        console.log(error)
        res.render('error/500')
        
    }

    
})

//@descp : Show edit page
//@route : /stories/id
router.get('/edit/:id',ensureAuth,async (req,res)=>{
    try {
        const story=await Story.findOne({_id:req.params.id}).lean()
        if(!story){
            res.render('error/404')
        }
        if(story.user != req.user.id){
            res.redirect('/stories')
        }
        res.render('stories/edit',{
            story:story
        })
        
    } catch (error) {
        console.log(error)
        res.render('error/500')
        
    }
})

//@descp : Update stories
//@route : /stories/id
router.put('/:id',ensureAuth,async (req,res)=>{
    try {
        let story=await Story.findOne({_id:req.params.id}).lean()
        if(!story){
            res.render('error/404')
        }
        if(story.user != req.user.id){
            res.redirect('/stories')
        }
        story=await Story.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true,
            runValidators:true,

        })
         res.redirect('/dashboard')
        
    } catch (error) {
        console.log(error)
        res.render('error/500')
        
    }
})

//@descp : del stories
//@route : /stories/id
router.delete('/:id',ensureAuth,async (req,res)=>{
    try {
        let story=await Story.findOne({_id:req.params.id}).lean()
        if(!story){
            res.render('error/404')
        }
        if(story.user != req.user.id){
            res.redirect('/stories')
        }
        story=await Story.remove({_id:req.params.id})
         res.redirect('/dashboard')
        
    } catch (error) {
        console.log(error)
        res.render('error/500')
        
    }
})


//@descp : Show story page
//@route : /stories/id
router.get('/:id',ensureAuth,async (req,res)=>{
    try {
        const story=await Story.findOne({_id:req.params.id}).populate('user').lean()
        if(!story){
            res.render('error/404')
        }
        
        res.render('stories/show',{
            story:story
        })
        
    } catch (error) {
        console.log(error)
        res.render('error/500')
        
    }
})

//@descp : Show user stories page
//@route : /stories/user/id
router.get('/user/:userId',ensureAuth,async (req,res)=>{
    try {
        const stories=await Story.find({
            user:req.params.userId,
            status:'public'

        }).populate('user')
        .lean()
         res.render('stories',{
            stories:stories
        })
        
    } catch (error) {
        console.log(error)
        res.render('error/500')
        
    }
})

module.exports =router