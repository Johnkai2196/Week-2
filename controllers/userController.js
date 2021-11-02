'use strict';
//userController
const {users,getUser} = require('../models/userModel');

const user_list_get = (req, res) => {
  // another style making a new array
  const newUser =users.map((user)=>{
    delete user.password;
  })

  res.json(users);
};
const user_get = (req, res) => {
  const user = getUser(req.params.userId);
  //working
  delete user.password;
  res.json(user);
};
const user_post=(req,res)=> {
  console.log('add user data',req.body)
  res.send('From this endpoint you can add users.');
}

module.exports = {
  user_list_get,
  user_get,
  user_post,
};