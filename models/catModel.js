'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getCat = async (catId, next) => {
// TODO find single cat objecty from cats-array and return it
  console.log(catId);
  try {
    const [rows] = await promisePool.query(
        `SELECT cat_id, owner, wop_cat.name AS name, weight, birthdate, filename, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id WHERE cat_id = ?`,
        [catId]);
    console.log('get by id', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const getAllCats = async (next, req) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query(
        'SELECT cat_id, owner, wop_cat.name AS name, weight, birthdate, filename, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id Where owner=?',
        [req.user.user_id]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const insertCat = async (cat, next) => {
  try {
    // TODO add filename
    const [rows] = await promisePool.execute(
        'INSERT INTO `wop_cat` (name, weight, owner, birthdate, filename) VALUES (?,?,?,?,?)',
        [cat.name, cat.weight, cat.owner, cat.birthdate, cat.filename]);
    console.log('model insert cat', rows);
    return rows.insertId;
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const deleteCat = async (catId, next, user) => {
  try {
    let rows;
    if (user.role === 1) {
      [rows] = await promisePool.execute(
          'DELETE FROM wop_cat WHERE cat_id=? and owner=?', [catId, user]);
    } else {
       [rows] = await promisePool.execute(
          'DELETE FROM wop_cat WHERE cat_id=?', [catId]);
    }
    console.log('model delete cat', rows);
    return rows.affectedRows === 1;
    return true;
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const updateCat = async (cat, next, user) => {
  try {
    const [rows] = await promisePool.execute(
        `UPDATE wop_cat SET name=?, weight=?, owner=?, birthdate=?  WHERE cat_id=? AND owner=?`,
        [cat.name, cat.weight, cat.owner, cat.birthdate, cat.id, user]);
    console.log('model update cat', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

module.exports = {
  getAllCats,
  getCat,
  insertCat,
  deleteCat,
  updateCat,
};
