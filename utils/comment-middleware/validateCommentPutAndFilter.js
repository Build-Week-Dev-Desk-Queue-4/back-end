module.exports = (req, res, next) => {
    if (!req.body) {
        res.status(400).json( { 
            message: "Missing body data. Ensure you sent the comment data you wish to be updated." 
        } );
    } else if (req.body.ticket_id || req.body.commenter_id || req.body.comment || typeof req.body.is_solution !== 'undefined') {
        next();
    } else {
        //if the req has a body, but doesn't include any of the comment's fields
        res.status(400).json({ message: "Ensure you sent data referring to one of the comment's felds." });
    }
}