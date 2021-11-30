'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt= require('bcryptjs')
const catRoute = require('./routes/catRoute');
const usersRoute = require('./routes/userRoute');
const authRoute = require(
    '../../Basic Concepts of Web Technology/Week-2/routes/authRoute');
const {httpError} = require('./utils/errors');
const passport = require('./utils/pass');
const app = express();
const port = 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, port);
} else {
  require('./utils/localhost')(app, 8000, port);
}

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(passport.initialize());
app.use(express.static('upload'));
app.use('/thumbnails', express.static('thumbnails'));

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), usersRoute);

app.get('/', async (req, res) => {
  if (req.secure) {
    res.send(await bcrypt.hash('asdf',10));
  } else {
    res.send('not secured?');
  }
});

app.use((req, res, next) => {
  const err = httpError('Not found', 404);
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({message: err.message || 'internal error'});
});
/*app.listen(port, () => console.log(`Example app listening on port ${port}!`));*/
