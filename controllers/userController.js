'use strict';
//userController
const {getAllUsers, getUser,  deleteUser, updateUser} = require(
    '../models/userModel');
const {httpError} = require('../utils/errors');

const user_list_get = async (req, res, next) => {
  const users = await getAllUsers(next,req.user.role,req.user.user_id);
  console.log('all users', users);
  if (users.length > 0) {
    res.json(users);
    return;
  }
  const err = httpError('User not found', 404);
  next(err);
};

const user_get = async (req, res, next) => {
  const user = await getUser(req.params.userId, next,req.user.user_id,
      req.user.role);
  if (user) {
    delete user.password;
    res.json(user);
    return;
  }
  const err = httpError('User not found', 404);
  next(err);
};


const user_delete = async (req, res, next) => {
  const deleted = await deleteUser(req.params.userId, next, req.user.user_id,
      req.user.role);
  res.json({message: `user deleted:${deleted}`});
};

const user_update = async (req, res, next) => {
  console.log('controller update user', req.body);
  const updated = await updateUser(req.body, next, req.user.user_id,
      req.user.role);
  console.log(updated);
  res.json({message: `user updated: ${updated}`});
};
const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('token not valid'));
  } else {
    res.json({user: req.user});
  }
};

module.exports = {
  user_list_get,
  user_get,
  user_delete,
  user_update,
  checkToken,
};