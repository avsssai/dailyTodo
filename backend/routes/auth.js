var express = require('express');
var User = require('../models/userModel');
var registerController = require('../controllers/registerController');
var loginController = require('../controllers/loginController');


var router = express.Router();

router.get('/home',(req,res)=>{
    res.json({
        message:"Logged in!"
    });
});

//REGISTER HANDLE

//register page fetch.
router.get('/register',registerController.getRegisterRoute);

//register a new user.
router.post('/register',registerController.createANewUser);


//LOGIN HANDLE

//login page fetch.
router.get('/login',loginController.getLoginRoute);

//login a user.
router.post('/login',loginController.loginAUser);



//logout a user
router.get('/logout',(req,res)=>{
    req.logout();
    // res.redirect('/api/auth/login');
    res.json({
        message:"Logged out!"
    })
});



module.exports = router;