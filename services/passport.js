const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { secret } = require('../config')
const User = require('../models/user')
const LocalStratagy = require('passport-local')
const bcrypt = require('bcrypt-nodejs')

// create local strategy for login in

passport.use(new LocalStratagy({ usernameField: 'email' }, (email,password, done) => {
  // verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false

  User.findOne({email}, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false) } 
    
    user.comparePassword(password, (err, isMatch)=>{
      if (err) { return done(err)} 
      if (!isMatch) { return done(null, false)  }
      return done(null, user) 
    })  
  })
}))

var opts = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'),
  secretOrKey : secret
}
// alternative ===>>> must include jwt before the token eg. "jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZDQwNzE0M2RhOWY5OTNiNWNkMzJhZTkiLCJpYXQiOjE1NjQ1MDQzODc0NDZ9.T7ul75TVkD-NfQ7u40l8n_hqfet2jfrqzsBxujBv1LM"
//jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    User.findOne({_id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });

}));



