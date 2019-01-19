var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.post("/register", function(request, response, next){
  addToDatabase(request, response);
});

router.post("/login", function(request, response, next){
  passport.authenticate("local", function(error, user, info){
    if(error){
      return response.status(501).json(error);
    }
    if(!user){
      return response.status(501).json(info);
    }
    request.logIn(user, function(error){
      if(error){
        return request.status(501).json(error);
      }
      return response.status(200).json({message: "Login Success"});
    });
  })(request, response, next);
});

async function addToDatabase(request, response){
  var user = new User({
    email: request.body.email,
    username: request.body.username,
    password: User.hashPassword(request.body.password),
    creationDate: Date.now()
  });

  try{
    userDocument = await user.save();
    return response.status(201).json(userDocument);
  } catch(error){
    return response.status(501).json(error);
  }

}

router.get("/user", isValidUser, function(request, response, next){
  return response.status(200).json(request.user);
});

function isValidUser(request, response, next){
  if(request.isAuthenticated()){
    next();
  } else{
    return response.status(401).json({message: "Unauthorized request."});
  }
}

router.get("/logout", isValidUser, function(request, response, next){
  request.logout();
  return response.status(200).json({message: "Logout Success"})
});


module.exports = router;
