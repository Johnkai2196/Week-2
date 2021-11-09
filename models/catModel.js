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

const getAllCats = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query(
        'SELECT cat_id, owner, wop_cat.name AS name, weight, birthdate, filename, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const insertCat = async (cat) => {
  try {
    // TODO add filename
    const [rows] = await promisePool.execute(
        'INSERT INTO `wop_cat` (name, weight, owner, birthdate, filename) VALUES (?,?,?,?,?)',
        [cat.name, cat.weight, cat.owner, cat.birthdate, cat.filename]);
    console.log('model insert cat', rows);
    return rows.insertId;
  } catch (e) {
    console.error('model insert cat', e.message);
  }
};

const deleteCat = async (catId) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM wop_cat WHERE cat_id=?', [catId]);
    console.log('model delete cat', rows);
    return true;
  } catch (e) {
    console.error('model delete cat', e.message);
  }
};

const updateCat = async (cat) => {
  try {
    const [rows] = await promisePool.execute(
        `UPDATE wop_cat SET name=?, weight=?, owner=?, birthdate=?  WHERE cat_id=?`,
        [cat.name, cat.weight, cat.owner, cat.birthdate, cat.id]);
    console.log('model update cat', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model updated cat', e.message);
  }
};

module.exports = {
  getAllCats,
  getCat,
  insertCat,
  deleteCat,
  updateCat,
};
