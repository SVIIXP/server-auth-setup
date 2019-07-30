const Autentication = require('../controllers/autentication')
const passportService = require('../services/passport')
const passport = require('passport')


module.exports = function (App) {
  

  App.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({ hi: 'there'})
  })


  App.post('/signup', Autentication.signup)
  App.post('/signin', passport.authenticate('local', { session: false }),Autentication.signin )
}