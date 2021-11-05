'use strict';
// catController
const {getAllCats, getCat, insertCat} = require('../models/catModel');

const cat_list_get = async (req, res) => {
  const cats = await getAllCats();
  console.log('all cats', cats);
  res.json(cats);
};
const cat_get = async (req, res) => {
  const cat = await getCat(req.params.catId);
  res.json(cat);

};
const cat_post = async (req, res) => {
  console.log('add cat data', req.body);
  console.log('filename', req.filename);
  const cat = req.body;
  cat.filename=req.file.filename;
  const id = await insertCat(cat);
  res.send(`cat added with id ${id}`);
};
module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};