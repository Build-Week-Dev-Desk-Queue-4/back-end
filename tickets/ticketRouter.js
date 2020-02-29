const router = require('express').Router();
const tickets = require('./ticketModel');
const errorHandler = require('../utils/errorHandler');
const validateTicketId = require('../utils/ticket-middleware/validateTicketId');
const validateTicketPutAndFilter = require('../utils/ticket-middleware/validateTicketPutAndFilter');
const getTicketData = require('../utils/getTicketData');

router.get('/', (req, res) => {
    //TODO make sure boolean values are returned as true/false, not 0/1
    tickets.get().then(async tickets => {
        const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
        res.status(200).json(ticketsToSend);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/:id', validateTicketId, async (req, res) => {
    //TODO make sure boolean values are returned as true/false, not 0/1
    // res.status(200).json(req.ticket);
    const ticket = await getTicketData(req.ticket);
    res.status(200).json(ticket);
});

router.get('/getby/filter', validateTicketPutAndFilter, (req, res) => {
    //TODO make sure boolean values are returned as true/false, not 0/1
    //must be { clumname: columnvalue}
    tickets.getBy(req.body).then(async tickets => {
        if (tickets.length > 0) {
            const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
            res.status(200).json(ticketsToSend);
        } else {
            res.status(500).json({ message: 'No tickets found.' });
        }
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/open', (req, res) => {
    //TODO make sure boolean values are returned as true/false, not 0/1
    tickets.getAllOpen().then(async tickets => {
        const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
        res.status(200).json(ticketsToSend);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/newest', (req, res) => {
    //TODO make sure boolean values are returned as true/false, not 0/1
    tickets.getNewest().then(async tickets => {
        const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
        res.status(200).json(ticketsToSend);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/oldest', (req, res) => {
    //TODO make sure boolean values are returned as true/false, not 0/1
    tickets.getOldest().then(async tickets => {
        const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
        res.status(200).json(ticketsToSend);
    }).catch(err => {
        errorHandler(err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/:id/comments', validateTicketId, (req, res) => {
    //TODO make sure boolean values are returned as true/false, not 0/1
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