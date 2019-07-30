const jwt = require('jwt-simple')
const User = require('../models/user')
const {secret} = require('../config')

function tokenForUser(user) {
  return jwt.encode({
    sub: user.id,
    iat: new Date().getTime()
  }, secret)
}



exports.signin = function (req, res, next) {
  res.send({token: tokenForUser(req.user)})

}



exports.signup = function (req, res, next) {
  const { email, password } = req.body
  console.log(email, password)
  
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }
  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { 
      console.log(err)
      return next(err)
    }

    if (existingUser) {
      console.log(existingUser)
      return res.status(422).send({ error: 'Email is in use'})
    }

     // if a user with email does  exists return an error
  const user = new User ({
    email,
    password 
  })

  user.save(function (err, newUser) {
    if (err) return next(err);
    res.send({ token: tokenForUser(newUser) }) 
    // saved!)
  })

    
  })

 
  // if a user with email does not exists create and savve user record

  // respond to the request indicating the user was created
  
  
  //
}