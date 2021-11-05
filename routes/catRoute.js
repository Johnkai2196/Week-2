'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const upload = multer({dest: './upload/'});
const {cat_list_get, cat_get, cat_post, cat_delete, cat_update} = require(
    '../controllers/catController');
const router = express.Router();

router.route('/')
  .get(cat_list_get)
  .post(upload.single('cat'), cat_post)
  .put(cat_update);

router.route('/:catId')
  .get(cat_get)
  .delete(cat_delete);

module.exports = router;