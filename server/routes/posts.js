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
router.get("/timeline/:username", async (req, res) => {
    try {
      const currentUser = await User.findOne({username: req.params.username});
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
router.delete('/:id/:userId',async(req,res)=>{
    try{
        const {id,userId} = req.params;
        const post = await Post.findById(id);
        console.log(id,post,req.params);
        if(userId === post.userId){
            //const updatedPost  = await Post.findByIdAndUpdate(id,{$set:req.body});
            await post.deleteOne();
            res.status(200).json("Post has been deleted successfully")
        }
        else{
            res.status(403).json("Post/User doesn't exist");
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
        await post.updateOne({$set:req.body});
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
            // console.log(post.likes.includes(req.body.userId),req.body.userId,post)
            if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("You have liked the post")
            }
            else{
            await post.updateOne({$pull:{likes:req.body.userId}});
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
            await post.updateOne({$push:{heart:req.body.userId}});
            res.status(200).json("You have liked the post")
            }
            else{
            await post.updateOne({$pull:{heart:req.body.userId}});
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
router.patch('/:id/comment',async(req,res)=>{
    const {id} = req.params;
    console.log(req.body)
    try{
        if(!mongoose.isValidObjectId(req.body.userId)){
            return res.status(404).json("User not found");
        }
        else{
            const post = await Post.findById(id)
            const updPost = await post.updateOne({$push:{comments:req.body.comments}})
            console.log(post)
            // const updUser = await user.updateOne({comments:req.body.comment});
            res.status(200).json(updPost);
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
})
module.exports = router;
