const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

require('dotenv').config(); // per importare le variabili .env

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    //tomamos el token, utilizamos el secret key  y lo desencriptamos. Luego se utilizs el id del payload del token para compararlo con el id de mi base de datos de user.
    //si encuentra el usuario dentro de la bd me devuelve el usuario al front. de lo contrario me devuelve un errorgx
    secretOrKey: process.env.SECRET_KEY
}, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.id })
        .then(user => {
            if (user) {
                return done(null, user)
            }
            else if (err) {
                console.log(err)
                return done(err, false);
            }
            else {
                return done(null, false)
            }
        })
        .catch(err => {
            console.log(err)
            return done(err, false)
        })

}))
