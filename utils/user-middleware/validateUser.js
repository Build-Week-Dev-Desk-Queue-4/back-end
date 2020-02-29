module.exports = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: "Missing post data. Ensure you sent the user's data." });
    } else if (!req.body.username || !req.body.password || !req.body.role || !req.body.first_name || !req.body.last_name || !req.body.email) {
        res.status(400).json({ message: "Incomplete user data. Please include the user's username, password, role, first_name, last_name and email." });
    } else {
        next();
    }
}