const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

// Register/Create user
router.post('/register',async(req,res)=>{
    const {username,email,password} = req.body;
    // console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await new User({username,email,password:hashedPassword});
        const user = await newUser.save();
        //res.send("ok")
        res.status(201).json(user)
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Login User
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try {
        const oldUser = await User.findOne({email});
        if(!oldUser){
            return res.status(404).json("Invalid username or password");
        }
        const validPassword = await bcrypt.compare(password,oldUser.password);
        if(!validPassword){
            return res.status(400).json("Invalid username or password");
        }
        return res.status(200).json(oldUser);
    }
    catch(err){
        // console.log(err.message);
        res.status(500).json(err);
    }
})

module.exports = router;