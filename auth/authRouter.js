const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../users/userModel');
const generateToken = require('../utils/generateToken');
const errorHandler = require('../utils/errorHandler');

router.post('/register', (req, res) => {
    const { username, password, role, first_name, last_name } = req.body;
    let user = { username, password, role, first_name, last_name };
    const hash = bcrypt.hashSync(user.password, 8); //higher in production
    user.password = hash;

    users.insert(user).then(addedUser => {
        const token = generateToken(addedUser);
        res.status(201).json({ user: addedUser, token });
    }).catch(err => {
        errorHandler(err, 500, 'Unable to register user.');
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    users.getBy({ username }).then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome back, ${username}!`, token});
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    }).catch(err => {
        errorHandler(err, 500, 'Unable to log user in.');
    });
});

module.exports = router;