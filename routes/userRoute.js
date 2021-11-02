'use strict';
// userRoute
const express = require('express');
const {user_list_get, user_get} = require('../controllers/userController');
const router = express.Router();
router.get('/', user_list_get);
router.get('/:userId',user_get);

module.exports = router;