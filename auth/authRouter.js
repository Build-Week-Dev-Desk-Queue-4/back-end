const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../users/userModel');
const generateToken = require('../utils/generateToken');
const errorHandler = require('../utils/errorHandler');
const validateUser = require('../utils/user-middleware/validateUser');

router.post('/register', validateUser, (req, res) => {
    const { username, password, role, first_name, last_name, email, image } = req.body;
    let user = { username, password, role, first_name, last_name, email, image };
    const hash = bcrypt.hashSync(user.password, 14); //higher in production
    user.password = hash;

    users.insert(user).then(addedUser => {
        const token = generateToken(addedUser);
        res.status(201).json({ user: addedUser, token });
    }).catch(err => {
        errorHandler(res, err, 500, 'Unable to register user.');
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    if (!req.body) {
        res.status(400).json({ message: "Missing post data. Ensure you sent the user's login information." });
    } else if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "Incomplete user data. Please include the user's username and password" });
    } else {
        users.getByWithPassword({ username }).first().then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome back, ${username}!`, token});
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        }).catch(err => {
            errorHandler(res, err, 500, 'Unable to log user in.');
        });
    }
});

module.exports = router;