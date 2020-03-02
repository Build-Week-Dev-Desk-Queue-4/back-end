module.exports = (res, { error, message, stack }, statusCode, errorMessage) => {
    console.log(`Error: ${error}\nMessage: ${message}\n Stack: ${stack}`);
    res.status(statusCode).json({ error, message, stack, errorMessage: errorMessage });
}