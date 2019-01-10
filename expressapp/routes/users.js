var express = require('express');
var router = express.Router();
var User = require("../models/user");

router.post("/register", function(request, response, next){
  addToDatabase(request, response);
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
