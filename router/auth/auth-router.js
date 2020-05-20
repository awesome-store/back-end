const router = require('express').Router();
// const model = require('./auth-model.js');
const passport = require('passport');

const Authentication = require('./authentication.js');
const requireSignIn = passport.authenticate('local', {session: false})


router.get('/sign-up', (req, res) => {
    res.render('authentication/sign-up')
})

router.post('/sign-up', Authentication.signUp)

router.get('/sign-in', (req, res) => {
    res.render('authentication/sign-in')
})

router.post('/sign-in', Authentication.signIn)


module.exports = router;

// const router = require('express').Router();
// const model = require('./auth-model.js');


// router.post('/', (req, res) => {
//     const userData = req.body;

//     model.createUser(userData)
//     .then(note => {
//       res.status(201).json({ message: 'User added!', note });
//     })
//     .catch (err => {
//       res.status(500).json({ message: 'Failed to add new user', err });
//     });
// });


// module.exports = router;