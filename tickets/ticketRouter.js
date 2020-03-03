const router = require('express').Router();
const tickets = require('./ticketModel');
const errorHandler = require('../utils/errorHandler');
const validateTicketId = require('../utils/ticket-middleware/validateTicketId');
const validateTicketPutAndFilter = require('../utils/ticket-middleware/validateTicketPutAndFilter');
const getTicketData = require('../utils/ticket-middleware/getTicketData');
const validateTicket = require('../utils/ticket-middleware/validateTicket');
const validateTicketAction = require('../utils/ticket-middleware/validateTicketAction');
const comments = require('../comments/commentModel');
const validateComment = require('../utils/comment-middleware/validateComment');

router.get('/', (req, res) => {
    tickets.get().then(async tickets => {
        const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
        res.status(200).json(ticketsToSend);
    }).catch(err => {
        errorHandler(res, err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/:id', validateTicketId, async (req, res) => {
    const ticket = await getTicketData(req.ticket);
    res.status(200).json(ticket);
});

router.get('/getby/filter', validateTicketPutAndFilter, (req, res) => {
    //must be { clumname: columnvalue}
    tickets.getBy(req.body).then(async tickets => {
        if (tickets.length > 0) {
            const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
            res.status(200).json(ticketsToSend);
        } else {
            res.status(500).json({ message: 'No tickets found.' });
        }
    }).catch(err => {
        errorHandler(res, err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/all/open', (req, res) => {
    tickets.getAllOpen().then(async tickets => {
        const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
        res.status(200).json(ticketsToSend);
    }).catch(err => {
        errorHandler(res, err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/all/newest', (req, res) => {
    tickets.getNewest().then(async tickets => {
        const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
        res.status(200).json(ticketsToSend);
    }).catch(err => {
        errorHandler(res, err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/all/oldest', (req, res) => {
    tickets.getOldest().then(async tickets => {
        const ticketsToSend = await Promise.all(tickets.map(async ticket => getTicketData(ticket)));
        res.status(200).json(ticketsToSend);
    }).catch(err => {
        errorHandler(res, err, 500, 'Unable to retrieve tickets.');
    });
});

router.get('/:id/comments', validateTicketId, (req, res) => {
    tickets.getComments(req.params.id).then(comments => {
        if (comments.length > 0) {
            comments.forEach(comment => {
                comment.is_solution === 0 ? comment.is_solution = false : comment.is_solution = true;
                return comment;
            });
            res.status(200).json(comments);
        } else {
            res.status(204).json({ message: 'No comments found.' });
        }
    }).catch(err => {
        errorHandler(res, err, 500, 'Unable to retrieve comments.');
    });
});

/*********************** COMMENT POST ********************/
router.post('/:id/comments', validateTicketId, validateComment, (req, res) => {
    comments.insert(req.body).then(comment => {
        comment.is_solution === 0 ? comment.is_solution = false : comment.is_solution = true;
        res.status(201).json(comment);
    }).catch(err => {
        errorHandler(res, err, 500, 'Could not add comment.');
    });
});

router.post('/', validateTicket, (req, res) => {
    tickets.insert(req.body).then(async ticket => {
        const ticketToSend = await getTicketData(ticket);
        res.status(201).json(ticketToSend);
    }).catch(err => {
        errorHandler(res, err, 500, 'Could not add ticket.');
    });
});

router.put('/:id', validateTicketId, validateTicketPutAndFilter, validateTicketAction, (req, res) => {
    tickets.update(req.body, req.params.id).then(async ticket => {
        const ticketToSend = await getTicketData(ticket);
        res.status(201).json(ticketToSend);
    }).catch(err => {
        errorHandler(res, err, 500, 'Could not update ticket.');
    });
});

//can only be done by a team leads, section leads or the user themselves
router.delete('/:id', validateTicketId, validateTicketAction, (req, res) => {
    tickets.remove(req.params.id).then(async numDeleted => {
        const ticket = await getTicketData(req.ticket);
        res.status(200).json(ticket);
    }).catch(err => {
        errorHandler(res, err, 500, "The ticket could not be removed");
    });
});

module.exports = router;