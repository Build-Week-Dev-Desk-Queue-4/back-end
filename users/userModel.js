const db = require('../data/dbConfig');

module.exports = {
    insert,
    get,
    getById,
    getBy,
    getTicketsByAskerId,
    getTicketsBySolvedById,
    getTicketsByAsignee,
    update,
    remove
}

async function insert(user) {
    const [id] = await db('users').insert(user);
    //test this code!!!
    return getById(id).select('id', 'username', 'role', 'first_name', 'last_name', 'email');
}

function get() {
    return db('users');
}

//DO NOT return password!!!!!
function getById(id) {
    return db('users').where({ id }).first();
}

function getBy(filter) {
    return db('users').where(filter);
}

function getTicketsByAskerId(id) {
    return db('tickets').where('asker_id', id);
}

function getTicketsBySolvedById(id) {
    return db('tickets').where('solved_by', id);
}

function getTicketsByAsignee(id) {
    return db('tickets').where('asignee', id);
}

function update(changes, id) {
    return db('users').where({ id }).update(changes).then(count => {
        return findById(id);
    });
}

function remove(id) {
    //returns deleted user
    return getById(id).then(user => {
        return db('users').where({ id }).del().then(count => {
            return user;
        });
    });
}