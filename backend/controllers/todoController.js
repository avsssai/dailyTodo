var Todo = require('../models/todos');
var authMiddleware = require('../middleware/index');

//get all todos

exports.getAllTodos = async (req,res)=>{
    try{
        var allTodos = await Todo.find({});
        res.json({
            message:"Displaying all todos in the database.",
            todos:allTodos
        });
    
    }catch(err){
        res.json({
            message:"Cannot get all todos in the database.",
            error:err
        })
    }
};

//create a todo.

exports.createATodo = async (req,res)=>{
    try{
        var owner = {
            id:req.user._id,
            username:req.user.username
        };
        var newTodo = new Todo({
            todo:req.body.todo,
            owner
        });
        var savedTodo = await newTodo.save();
        if(!savedTodo){
            res.json({
                message:"cannot create a todo."
            })
        }
        res.json({
            message:"Created a Todo.",
            createATodo:savedTodo
        });
    }catch(err){
        console.log(err);
    }
};

//delete a todo.

exports.deleteATodo = async (req,res)=>{
    var id = req.params.id;
    var deletedTodo =  await Todo.findByIdAndDelete(id);
    if(!deletedTodo){
        res.json({
            message:"Cannot delete the Todo."
        });
    };

    res.json({
        message:"deleted a Todo."
    })
};

//update a todo.

exports.updateATodo = async (req,res)=>{
    try{
        var id = req.params.id;
        var udpate = {
            todo:req.body.todo
        };
        var updatedTodo = await Todo.findOneAndUpdate({_id:id},udpate,{new:true});
        res.json({
            message:"updated a Todo.",
            updatedTodo
        });
    
    }catch(err){
        res.json({
            message:`Could not update the todo with id:${id}`,
            error:err
        });
    }
};


