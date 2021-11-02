'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getCat = async (catId) => {
// TODO find single cat objecty from cats-array and return it
  console.log(catId)
  try {
    const [rows] = await promisePool.query(
        `SELECT * FROM wop_cat where cat_id =${catId}`);
    console.log(rows)
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
//  return cats.filter(val => val.id == catId);
};

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');

    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};
module.exports = {
  getAllCats,
  getCat,
};
