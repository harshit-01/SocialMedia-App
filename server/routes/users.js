const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();

// router.get('/',(req,res)=>{
//     res.send("Hey");
// })

// update user
router.put('/:id',async(req,res)=>{
    console.log(req.body.userId)
    if(req.body.userId === (req.params.id || req.body.isAdmin) ){
        // User wants to change password
        if(req.body.password){
            try{
            const salt= await bcrypt.genSalt(10);
            // password encrypted
            req.body.password = await bcrypt.hash(req.body.password,salt)
            //return res.status().json("Password updated successfully");
            }
            catch(err){
                res.status(500).json("Error updating password")
            }
        }
         // update user now with the new Password
         try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body  // everything will updated that is in the request body .
            });
            res.status(200).json("Account has been updated")
        }
        catch(err){
            res.status(500).json("Error updating user")
        }
    }
    else{
        return res.status(403).json("You can only update your account");
    }
})
router.put('/:id/info',async(req,res)=>{
    console.log(req.body)
    if(req.body.userId == (req.params.id || req.body.isAdmin) ){
         try{
            const user = await User.findByIdAndUpdate(req.params.id,{ $set:req.body });
            // console.log(user)
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        return res.status(403).json("You can only update your account");
    }
})
// delete a user
router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    //console.log(id)
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(500).json("User not found");
    }
    try{
    await User.findByIdAndDelete(id);
    res.status(200).json("User deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
})
// get a user 
router.get('/',async(req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    console.log(userId,username)
    if(userId && !mongoose.isValidObjectId(userId)){
        return res.status(404).json("User not found");
    }
    try{
    const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
    const {password,updatedAt,...other} = user._doc
    res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
})
// get all friends 
router.get('/:userId/friends',async (req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);
        console.log(currentUser)
        const friends = await Promise.all(
            currentUser.followings.map((friendId) => {
              return User.findById(friendId);
            })
        )

        let friendList = [];
          friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
    }
    catch(err){
        // console.log(err)
        res.status(500).json(err);
    }
})
// follow a user
router.put('/:id/follow',async(req,res)=>{
    const {id} = req.params;
    console.log(id,req.body.userId)
    try{
    const user = await User.findById(id);
    const currentUser = await User.findOne({username:req.body.username})
    console.log(id,req.body.userId)
    if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push:{followers:currentUser._id}}) 
        await currentUser.updateOne({$push:{followings:id}})
        return res.status(200).json("Followed");
    }
    else{
        return res.status(403).json('You are already a follower'); // Request to resource forbidden
    }
    }
    catch(err){
        res.status(500).json(err)
    }
    //res.status(200).json(other);
})
// unfollow a user
router.put('/:id/unfollow',async(req,res)=>{
    const {id} = req.params;
    console.log(id,req.body.username)
    try{
    const user = await User.findById(id);
    const currentUser = await User.findOne({username:req.body.username})
    console.log(id,currentUser)
    if(user.followers.includes(currentUser._id)){
        await user.updateOne({$pull:{followers:currentUser._id}}) 
        await currentUser.updateOne({$pull:{followings:id}})
        return res.status(200).json("Unfollowed");
    }
    else{
        return res.status(403).json('You are not a follower of this user'); // Request to resource forbidden
    }
    }
    catch(err){
        res.status(500).json(err)
    }
    //res.status(200).json(other);
})

router.put('/:id/events',async(req,res)=>{
    const {id} = req.params;
    console.log(req.body)
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json("User not found");
    }
    try{
        const user = await User.findByIdAndUpdate(id,{$push:{title:req.body.title,start:req.body.start,end:req.body.end}});
        return res.status(200).json(user)
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;