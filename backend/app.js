var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var User = require('./models/userModel');



//database connection.
mongoose.connect('mongodb://localhost:27017/dailyTodo',{useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log("Connected to the database.")
    })
    .catch(err=>{
        console.log(err);
    })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');
var authRouter = require('./routes/auth');

var app = express();

app.use(session({
    secret:process.env.dev || "shiva",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/todos',todosRouter);
app.use('/api/auth',authRouter);

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

//serialize and deserialize a user.
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

module.exports = app;
