module.exports = (req, res, next) => {
    if (req.decodedToken && req.decodedToken.role && (req.decodedToken.role.toLowerCase() === 'team lead' || req.decodedToken.role.toLowerCase() === 'section lead')) {
        next();
    } else if (req.decodedToken && req.decodedToken.subject && req.decodedToken.subject === req.ticket.asker_id) {
        next();
    } else {
        res.status(403).json({ message: 'You are not authorized to perform this action.' });
    }
}