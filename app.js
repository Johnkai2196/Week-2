'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const usersRoute = require('./routes/userRoute');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use('/cat', catRoute);
app.use('/user', usersRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
