const router = require('express').Router();
const tickets = require('./ticketModel');
const errorHandler = require('../utils/errorHandler');
const validateTicketId = require('../utils/ticket-middleware/validateTicketId');
const validateTicketPutAndFilter = require('../utils/ticket-middleware/validateTicketPutAndFilter');

router.get('/', (req, res) => {
    tickets.get().then(tickets => {
        res.status(200).json(tickets);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/:id', validateTicketId, (req, res) => {
    res.status(200).json(req.ticket);
});

router.get('/filter', validateTicketPutAndFilter, (req, res) => {
    //TEST Should I make the filter put in an obj like, { filter: { username: "blah" } }
    tickets.getBy(req.body).then(tickets => {
        if (tickets.length > 0) {
            res.status(200).json(tickets);
        } else {
            res.status(500).json({ message: 'No tickets found.' });
        }
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/open', (req, res) => {
    tickets.getAllOpen().then(tickets => {
        res.status(200).json(tickets);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/newest', (req, res) => {
    tickets.getNewest().then(tickets => {
        res.status(200).json(tickets);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/oldest', (req, res) => {
    tickets.getOldest().then(tickets => {
        res.status(200).json(tickets);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/:id/comments', validateTicketId, (req, res) => {
    tickets.getComments(req.params.id).then(comments => {
        if (comments.length > 0) {
            res.status(200).json(comments);
        } else {
            res.status(204).json({ message: 'No comments found.' });
        }
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve comments.');
    });
});

module.exports = router;