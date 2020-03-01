const db = require('../data/dbConfig');

module.exports = {
    insert,
    get,
    getById,
    getBy,
    getByWithPassword,
    getTicketsByAskerId,
    getTicketsBySolvedById,
    getTicketsByAssignee,
    getAllAssociatedTickets,
    getAllAssociatedOpenTickets,
    update,
    remove
}

async function insert(user) {
    const [id] = await db('users').insert(user);
    //test this code!!!
    return getById(id).select('id', 'username', 'role', 'first_name', 'last_name', 'email');
}

function get() {
    return db('users').select('id', 'username', 'role', 'first_name', 'last_name', 'email');
}

function getById(id) {
    return db('users').where({ id }).select('id', 'username', 'role', 'first_name', 'last_name', 'email').first();
}

function getBy(filter) {
    return db('users')
        .where(Object.keys(filter)[0], 'like', '%' + Object.values(filter)[0] + '%')
        .select('id', 'username', 'role', 'first_name', 'last_name', 'email');
}

//for login
function getByWithPassword(filter) {
    return db('users').where(filter);
}

function getTicketsByAskerId(id) {
    return db('tickets').where('asker_id', id);
}

function getAllAssociatedTickets(id) {
    return db('tickets')
        .where('asker_id', id)
        .orWhere('solved_by', id)
        .orWhere('assignee', id)
        .orWhere('assigned_by', id);
}

function getAllAssociatedOpenTickets(id) {
    return db('tickets')
        .where({ asker_id: id, resolved: false } )
        .orWhere('solved_by', id)
        .orWhere('assignee', id)
        .orWhere('assigned_by', id);
}

function getTicketsBySolvedById(id) {
    return db('tickets').where('solved_by', id);
}

function getTicketsByAssignee(id) {
    return db('tickets').where('assignee', id);
}

function update(changes, id) {
    return db('users').where({ id }).update(changes).then(count => {
        return getById(id);
    });
}

function remove(id) {
    return db('users').where({ id }).del();

}