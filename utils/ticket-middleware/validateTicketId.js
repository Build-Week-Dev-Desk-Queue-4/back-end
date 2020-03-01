const tickets = require('../../tickets/ticketModel');
const errorHandler = require('../errorHandler.js');

module.exports = (req, res, next) => {
    tickets.getById(req.params.id).then(ticket => {
        if (ticket) {
            req.ticket = ticket;
            next();
        } else {
            res.status(400).json({ message: "No ticket found with that id." });
        }
    }).catch(err => {
        errorHandler(res, err, 500, "The ticket information could not be retrieved.");
    });
}