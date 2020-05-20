const router = require('express').Router();
const model = require('./auth-model.js');


router.post('/', (req, res) => {
    const userData = req.body;

    model.createUser(userData)
    .then(note => {
      res.status(201).json({ message: 'User was added!' });
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to add new user', err });
    });
});


module.exports = router;