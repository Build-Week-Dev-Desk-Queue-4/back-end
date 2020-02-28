const router = require('express').Router();
const users = require('./userModel');
const errorHandler = require('../utils/errorHandler');

//gets a list of all users
router.get('/', (req, res) => {
    users.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve users.');
    });
});

//validate id middleware
router.get('/:id', (req, res) => {
    const { id } = req.params;

    users.getById(id)
    .then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Could not find user with given id.' })
        }
    })
    .catch(err => {
        errorHandler(err, 500, 'Failed to get user.');
    });
});

module.exports = router;