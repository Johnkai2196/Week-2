'use strict';
//userController
const {getAllUsers, getUser, insertUser, deleteUser, updateUser} = require(
    '../models/userModel');

const user_list_get = async (req, res) => {
  const users = await getAllUsers();
  console.log('all users', users);
  res.json(users);
};

const user_get = async (req, res) => {
  const user = await getUser(req.params.userId);
  res.json(user);
};

const user_post = async (req, res) => {
  console.log('add user data', req.body);
  const user = req.body;
  const id = await insertUser(user);
  res.send(`cat added with id ${id}`);
  res.json(id);
};

const user_delete = async (req, res) => {
  const deleted = await deleteUser(req.params.userId);
  res.json({message: `user deleted:${deleted}`});
};

const user_update = async (req, res) => {
  console.log('controller update user', req.body);
  const updated = await updateUser(req.body);
  console.log(updated);
  res.json({message: `user updated: ${updated}`});
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_delete,
  user_update,
};