'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();
/*
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getUser = (userId) => {
// TODO find single cat objecty from cats-array and return it
  return users.filter(val => val.id === userId);
};
*/

const getUser = async (userId) => {
  try {
    const [rows] = await promisePool.query(
        `SELECT * FROM wop_user where user_id = ?`, [userId]);
    console.log('get by id', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};
const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO `wop_user` (name, email, password) VALUES (?,?,?)',
        [user.name, user.email, user.passwd]);
    console.log('model insert user', rows);
    return rows.insertId;
  } catch (e) {
    console.error('model insert user', e.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM wop_user WHERE user_id=?', [userId]);
    console.log('model delete user', rows);
    return true;
  } catch (e) {
    console.error('model delete user', e.message);
  }

};
const updateUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
        `UPDATE wop_user SET name=?, email=?, password=?  WHERE user_id=?`,
        [user.name, user.email, user.password, user.id]);
    console.log('model update user',rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model updated user', e.message);
  }
};
module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
};
