module.exports = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: "Missing post data. Ensure you sent the ticket's data." });
    } else if (!req.body.asker_id || !req.body.title || !req.body.description || !req.body.category) {
        res.status(400).json({ message: "Incomplete ticket data. Please include the ticket's asker_id, title, description and category." });
    } else {
        next();
    }
}