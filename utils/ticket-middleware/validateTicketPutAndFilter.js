module.exports = (req, res, next) => {
    if (!req.body) {
        res.status(400).json( { 
            message: "Missing body data. Ensure you sent the ticket data you wish to be updated." 
        } );
    } else if (req.body.asker_id || req.body.title || req.body.description || req.body.category || typeof req.body.resolved !== 'undefined' || typeof req.body.being_solved !== 'undefined' || req.body.solved_by || req.body.assignee || req.body.assigned_by) {
        next();
    } else {
        //if the req has a body, but doesn't include any of the ticket's fields
        res.status(400).json({ message: "Ensure you sent data referring to one of the ticket's felds." });
    }
}