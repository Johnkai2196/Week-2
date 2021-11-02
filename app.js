'use strict';
const express = require('express');
const catRoute = require('./routes/catRoute');
const usersRoute = require('./routes/userRoute');
const app = express();
const port = 3000;

app.use('/cat', catRoute);
app.use('/user', usersRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
