const users = require('../../users/userModel');
const errorHandler = require('../errorHandler');

module.exports = (req, res, next) => {
    users.getById(req.params.id).then(user => {
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({ message: "No user found with that id." });
        }
    }).catch(err => {
        errorHandler(res, err, 500, "The user's information could not be retrieved.");
    });
}