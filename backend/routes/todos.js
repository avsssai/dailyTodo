var router = require('express').Router();
var todosController = require('../controllers/todoController');
var authMiddleware = require('../middleware/index');


//get all todos route.
router.get('/',authMiddleware.isLoggedIn,todosController.getAllTodos);

//get the todos of a specific user.


//post a todo to the database.
router.post('/',todosController.createATodo);

//delete a todo.
router.delete('/:id',todosController.deleteATodo);

//update a todo.
router.put('/:id',todosController.updateATodo);


module.exports = router;