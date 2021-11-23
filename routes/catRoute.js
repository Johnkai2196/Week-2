'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
    return;
  }
  cb(null, false);
};
const upload = multer({dest: './upload/', fileFilter});
const {cat_list_get, cat_get, cat_post, cat_delete, cat_update} = require(
    '../controllers/catController');
const {body} = require('express-validator');
const router = express.Router();

router.route('/').
    get(cat_list_get).
    post(upload.single('cat'),
        body('name').notEmpty(),
        body('birthdate').isDate(),
        body('weight').isNumeric().notEmpty(),

        cat_post,
    );

router.route('/:catId').get(cat_get).delete(cat_delete).
    put(cat_update);
module.exports = router;