const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets');

module.exports = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    }
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, jwtSecret, options);
}