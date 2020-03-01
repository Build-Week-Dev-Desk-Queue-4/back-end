const comments = require('../../comments/commentModel');
const errorHandler = require('../errorHandler.js');

module.exports = (req, res, next) => {
    comments.getById(req.params.id).then(comment => {
        if (comment) {
            req.comment = comment;
            next();
        } else {
            res.status(400).json({ message: "No comment found with that id." });
        }
    }).catch(err => {
        errorHandler(res, err, 500, "The comment information could not be retrieved.");
    });
}