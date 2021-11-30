'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const {getUserLogin} = require('../models/userModel');

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (!user) {
          return done(null, false, {message: 'Incorrect email/password.'});
        }
        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false, {message: 'Incorrect email/password.'});
        }
        delete user.password;
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'aerfjipo9',
    },
    (jwtPayload, done) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      console.log('jwtPayload', jwtPayload);
      return done(null, jwtPayload);
    },
));
module.exports = passport;