const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.export = passport => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    console.log(jwtPayload);
    done();  // middleware -> handles the next middleware/function
  }))
}