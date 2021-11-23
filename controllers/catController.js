'use strict';
// catController
const {getAllCats, getCat, insertCat, deleteCat, updateCat} = require(
    '../models/catModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const cat_list_get = async (req, res, next) => {
  const cats = await getAllCats(next, req);
  console.log('all cats', cats);
  if (cats.length > 0) {
    res.json(cats);
    return;
  }
  const err = httpError('Cat not found', 404);
  next(err);
};

const cat_get = async (req, res, next) => {
  const cat = await getCat(req.params.catId, next, req);
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
  console.log('add cat data', req.body, req.user);
  console.log('filename', req.file);
  if (!req.file) {
    const err = httpError('Invalid file', 400);
    next(err);
    return;
  }
  const cat = req.body;
  cat.filename = req.file.filename;
  cat.owner = req.user.user_id;
  const id = await insertCat(cat, next);
  res.json({message: `cat added with id ${id} `, cat_id: id});

};

const cat_delete = async (req, res, next) => {
  const deleted = await deleteCat(req.params.catId, next, req.user.user_id,
      req.user.role);
  res.json({message: `Cat deleted:${deleted}`});
};

const cat_update = async (req, res, next) => {
  console.log('controller update cat', req.body);
  req.body.id = req.params.catId;
  req.body.owner = req.body.owner || req.user.user_id;
  req.body.role = req.user.role;
  const updated = await updateCat(req.body, next);
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