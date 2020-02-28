const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('../auth/authRouter');
const userRouter = require('../users/userRouter');
const ticketRouter = require('../tickets/ticketRouter');
const restricted = require('../utils/restricted');

const server = express();

server.use(helmet(), cors(), express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, userRouter);
server.use('/api/tickets', restricted, ticketRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Dev Desk Queue API!!!' });
})

module.exports = server;
