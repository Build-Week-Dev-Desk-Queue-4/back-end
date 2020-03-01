module.exports = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: "Missing post data. Ensure you sent the comment's data." });
    } else if (!req.body.ticket_id || !req.body.commenter_id || !req.body.comment) {
        res.status(400).json({ message: "Incomplete ticket data. Please include the ticket's ticket_id, commenter_id and comment." });
    } else {
        next();
    }
}