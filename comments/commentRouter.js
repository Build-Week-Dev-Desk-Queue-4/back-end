const router = require('express').Router();
const comments = require('./commentModel');
const errorHandler = require('../utils/errorHandler');
const validateComment = require('../utils/comment-middleware/validateComment');
const validateCommentId = require('../utils/comment-middleware/validateCommentId');
const validateCommentPutAndFilter = require('../utils/comment-middleware/validateCommentPutAndFilter');
const validateCommentRemoval = require('../utils/comment-middleware/validateCommentRemoval');

router.post('/', validateComment, (req, res) => {
    comments.insert(req.body).then(comment => {
        res.status(201).json(comment);
    }).catch(err => {
        errorHandler(err, 500, 'Could not add comment.');
    });
});

router.put('/:id', validateCommentId, validateCommentPutAndFilter, (req, res) => {
    comments.update(req.body, req.params.id).then(comment => {
        res.status(200).json(comment);
    }).catch(err => {
        errorHandler(err, 500, 'Could not update comment.');
    });
});

//can only be done by a team leads, section leads or the user who posted the comment themselves
router.delete('/:id', validateCommentId, validateCommentRemoval, (req, res) => {
    comments.remove(req.params.id).then(comment => {
        res.status(200).json(comment);
    }).catch(err => {
        errorHandler(err, 500, "The comment could not be removed");
    });
});

module.exports = router;