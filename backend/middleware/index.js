var Todo = require('../models/todos');
var User = require('../models/userModel');

var authMiddleware = {};

authMiddleware.isLoggedIn = (req,res,next)=>{
    //check if the user is logged in.
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('back');
    }
};

authMiddleware.checkOwnership = (req,res,next)=>{
    //check if logged in.
    if(req.isAuthenticated()){
        //check if the user owns the todo.
        
        next();
    }else{
        res.redirect('back');
    }
}

module.exports = authMiddleware;