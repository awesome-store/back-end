const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const config = require('./config.js');
const {createUser} = require('./auth-model.js');


const tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    return jwt.encode({sub: user.id, iat: timestamp}, config.jwtSecret)
}

const signIn = (req, res, next) => {
    res.send({token: tokenForUser(req.user)})
}

const signUp = (req, res, next) => {
    const {name, email, password} = req.body
    const saltRounds = 12

    if (!email || !password) {
        res.status(422).send({error: 'Need credentials'})
    }

    bcrypt.hash(password, saltRounds)
        .then((hash) => {
            return createUser(name, email, hash)
                .then((newUser) => {
                    res.json({token: tokenForUser(newUser)})
                })
                .catch((err) => {
                    res.json({error: 'Error saving'})
                })
        })
    .catch((err) => {
        return next(err)
    })
}

module.exports = {signUp, signIn}