var User = require("../models/userModel");
var bcrypt = require("bcrypt");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          throw err;
        }
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {
            message:
              "The Password entered is wrong, please check your password."
          });
        }
      });
    });
  })
);

exports.getLoginRoute = (req, res) => {
  res.json({
    message: "Login route"
  });
};

exports.loginAUser = async (req, res) => {
  //use passport local strategy to authenticate the user.
  //login the user.
  await passport.authenticate('local',{
    successRedirect:'/api/auth/home',
    failureRedirect:'/api/auth/login'
  })(req,res);
};
