'use strict';
// userRoute
const express = require('express');
const multer = require('multer');
const upload = multer({dest: './upload/'});
const {user_list_get, user_get, user_post, user_delete, user_update} = require(
    '../controllers/userController');
const router = express.Router();


router.route('/')
    .get(user_list_get)
    .post(upload.single('user'),user_post)
    .put(user_update)
router.route('/:userId')
    .get(user_get)
    .delete(user_delete)


module.exports = router;