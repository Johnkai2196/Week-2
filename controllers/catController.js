'use strict';
// catController
const {getAllCats, getCat, insertCat, deleteCat, updateCat} = require(
    '../models/catModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const cat_list_get = async (req, res, next) => {
  const cats = await getAllCats();
  console.log('all cats', cats);
  if (cats.length > 0) {
    res.json(cats);
    return;
  }
  const err = httpError('Cat not found', 404);
  next(err);
};

const cat_get = async (req, res, next) => {
  const cat = await getCat(req.params.catId, next);
  if (cat) {
    res.json(cat);
    return;
  }
  const err = httpError('Cat not found', 404);
  next(err);
};

const cat_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('cat_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  console.log('add cat data', req.body);
  console.log('filename', req.file);
  if (!req.file) {
    const err = httpError('Invalid file', 400);
    next(err);
    return;
  }
  const cat = req.body;
  cat.filename = req.file.filename;
  const id = await insertCat(cat);
  res.json({message: `cat added with id ${id} `, cat_id: id});

};

const cat_delete = async (req, res) => {
  const deleted = await deleteCat(req.params.catId);
  res.json({message: `Cat deleted:${deleted}`});
};

const cat_update = async (req, res) => {
  console.log('controller update cat', req.body);
  const updated = await updateCat(req.body);
  console.log(updated);
  res.json({message: `Cat updated: ${updated}`});
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
};