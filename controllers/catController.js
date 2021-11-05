'use strict';
// catController
const {getAllCats, getCat, insertCat, deleteCat, updateCat} = require(
    '../models/catModel');

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
  console.log('filename', req.file);
  const cat = req.body;
  cat.filename = req.file.filename;
  const id = await insertCat(cat);
  res.send(`cat added with id ${id}`);
  res.json(cat);
};

const cat_delete = async (req, res) => {
  const deleted = await deleteCat(req.params.catId);
  res.json({message: `Cat deleted:${deleted}`});
};

const cat_update = async (req, res) => {
  console.log("controller update cat",req.body);
  const updated = await updateCat(req.body);
  console.log(updated)
  res.json({message: `Cat updated: ${updated}`});
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
};