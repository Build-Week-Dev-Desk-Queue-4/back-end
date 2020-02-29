const db = require('../data/dbConfig');

module.exports = {
    insert,
    get,
    getById,
    getBy,
    getTicketsByAskerId,
    getTicketsBySolvedById,
    getTicketsByAssignee,
    update,
    remove
}

async function insert(user) {
    const [id] = await db('users').insert(user);
    //test this code!!!
    return getById(id).select('id', 'username', 'role', 'first_name', 'last_name', 'email');
}

//DO NOT return password!!!!!
function get() {
    return db('users');
}

//DO NOT return password!!!!!
function getById(id) {
    return db('users').where({ id }).first();
}

//DO NOT return password!!!!!
function getBy(filter) {
    return db('users').where(filter);
}

function getTicketsByAskerId(id) {
    return db('tickets').where('asker_id', id);
}

function getTicketsBySolvedById(id) {
    return db('tickets').where('solved_by', id);
}

function getTicketsByAssignee(id) {
    return db('tickets').where('asignee', id);
}

function update(changes, id) {
    return db('users').where({ id }).update(changes).then(count => {
        return findById(id);
    });
}

function remove(id) {
    return db('users').where({ id }).del();

}