'use strict';
// catController
const {cats, getCat} = require('../models/catModel');

const cat_list_get = (req, res) => {
  res.json(cats);
};
const cat_get = (req, res) => {
  const cat = getCat(req.params.catId);
  res.json(cat);

};

module.exports = {
  cat_list_get,
  cat_get,
};