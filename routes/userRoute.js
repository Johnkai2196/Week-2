'use strict';
// userRoute
const express = require('express');
const multer = require('multer');
const upload = multer({dest: './upload/'});
const {
  user_list_get,
  user_get,
  user_delete,
  user_update,
  checkToken,
} = require(
    '../controllers/userController');
const {body} = require('express-validator');
const router = express.Router();

router.get('/token', checkToken);

router.route('/').
    put(user_update).get(user_list_get);

router.route('/:userId').get(user_get).delete(user_delete);

module.exports = router;