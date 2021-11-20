'use strict';
// userRoute
const express = require('express');
const multer = require('multer');
const upload = multer({dest: './upload/'});
const {
  user_list_get,
  user_get,
  user_post,
  user_delete,
  user_update,
  checkToken,
} = require(
    '../controllers/userController');
const {body} = require('express-validator');
const router = express.Router();

router.get('/token', checkToken);
router.route('/').
    get(user_list_get).
    post(body('name').isLength({min: 3}), body('email').isEmail(),
        body('passwd').matches('(?=.*[A-Z]).{8,}'),
        user_post).
    put(user_update);
router.route('/:userId').get(user_get).delete(user_delete);

module.exports = router;