var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");

passport.use("local", new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},
  function(username, password, done){
    User.findOne({email: username}, function(error, user){
      if(error){
        return done(error);
      }
      if(!user){
        return done(null, false, {message: "Incorrect username."});
      }
      if(!user.isValid(password)){
        return done(null, false, {message: "Incorrect password"});
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(error, user){
    done(error, user);
  });
});
