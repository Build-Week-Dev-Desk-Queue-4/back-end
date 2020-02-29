const router = require('express').Router();
const tickets = require('./ticketModel');
const errorHandler = require('../utils/errorHandler');
const validateTicketId = require('../utils/ticket-middleware/validateTicketId');

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

module.exports = router;