const express = require('express');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

// create  Post 
router.post('/',async(req,res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }

})

// get a Post
router.get('/:id',async(req,res) => {
    const {id} = req.params;
    try{
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json("Post not found");
        }
        else{
            const post = await Post.findById(id);
            res.status(200).json(post);
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// get timeline Post  (all post of this user)
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete Post
router.delete('/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const post = await Post.findById(id);
    if(req.body.userId === post.userId){
        //const updatedPost  = await Post.findByIdAndUpdate(id,{$set:req.body});
        await Post.findByIdAndDelete(id);
        res.status(200).json("Post has been successfully deleted")
    }
    else{
        res.status(403).json("User doesn't exist");
    }
    }
    catch(err){
        res.status(500).json(err)
    }
})

// update Post
router.put('/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const post = await Post.findById(id);
    if(req.body.userId === post.userId){
        //const updatedPost  = await Post.findByIdAndUpdate(id,{$set:req.body});
        await Post.updateOne({$set:req.body});
        // console.log(req.body)
        res.status(200).json("Post has been updated")
    }
    else{
        res.status(403).json("User doesnt exist");
    }
    }
    catch(err){
        res.status(500).json(err)
    }
})

// like/dislike Post
router.patch('/:id/like',async (req,res) => {
    try{
        const {id} = req.params;
        const post = await Post.findById(id);
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json("Post not found");
        }
        else{
            if(!post.likes.includes(req.body.userId)){
            await Post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("You have liked the post")
            }
            else{
            await Post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("You have disliked the post")
            }
        }
        }
        catch(err){
            res.status(500).json(err)
        }
})
router.patch('/:id/heart',async (req,res) => {
    try{
        const {id} = req.params;
        const post = await Post.findById(id);
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json("Post not found");
        }
        else{
            if(!post.likes.includes(req.body.userId)){
            await Post.updateOne({$push:{heart:req.body.userId}});
            res.status(200).json("You have liked the post")
            }
            else{
            await Post.updateOne({$pull:{heart:req.body.userId}});
            res.status(200).json("You have disliked the post")
            }
        }
        }
        catch(err){
            res.status(500).json(err)
        }
})

//get user's all posts

router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;
