var User = require('../models/userModel');
var bcrypt = require('bcrypt');


exports.getRegisterRoute = (req,res)=>{
    res.json({
        message:"Register route"
    });
};



exports.createANewUser = async (req,res)=>{
    //get the user data in the req.body
    //hash the password
    //save in the database.
    try{
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(req.body.password,salt);
        if(!hash){
            res.status(400).json({
                message:"error hashing password."
            });
        };

        var newUser = new User({
            username:req.body.username,
            password:hash
        });

        var userToSave = await newUser.save();

        if(!userToSave){
            res.status(400).json({
                message:"Could not create a new user."
            });
        }
        
        res.json({
            message:"Successfully created a new User.",
            createdUser:userToSave
        });
    
    }catch(err){
        res.json({
            message:"Error creating new user.",
            error:err
        });
    }
};

