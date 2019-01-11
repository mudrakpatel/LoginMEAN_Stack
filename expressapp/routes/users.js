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
      return response.status(200).json({message: "Login success"});
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

module.exports = router;
