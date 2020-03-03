module.exports = (req, res, next) => {
    if (!req.body) {
        res.status(400).json( { 
            message: "Missing body data. Ensure you sent the user data you wish to be updated." 
        } );
    } else if (req.body.username || req.body.password || req.body.role || req.body.first_name || req.body.last_name || req.body.email || req.body.image) {
        next();
    } else {
        //if the req has a body, but doesn't include any of the user's fields
        res.status(400).json({ message: "Ensure you sent data referring to one of the user's felds." });
    }
}