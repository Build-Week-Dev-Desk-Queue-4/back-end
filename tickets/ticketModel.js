const db = require('../data/dbConfig');

module.exports = {
    get,
    getAllOpen,
    getById,
    getBy,
    getNewest,
    getOldest,
    getComments,
    insert,
    update,
    remove
}

//STRETCH: display number of comments with tickets.
function get() {
    return db('tickets');
}

function getById(id) {
    return db('tickets').where({ id }).first();
}

//this should allow get by category, title, description, resolved or not, not being solved
function getBy(filter) {
    return db('tickets').where(Object.keys(filter)[0], 'like', '%' + Object.values(filter)[0] + '%');
}

//return all tickets that aren't resolved AND aren't being solved.
function getAllOpen() {
    return db('tickets').where({resolved: false, being_solved: false});
}

function getNewest() {
    return db('tickets').orderBy('created_at', 'desc');
}

function getOldest() {
    return db('tickets').orderBy('created_at');
}

function getComments(id) {
    return db('comments as c')
        .join('users as u', 'u.id', 'c.commenter_id')
        .select('c.id', 'u.role', 'u.username', 'u.first_name', 'u.last_name', 'c.comment', 'c.is_solution')
        .where('ticket_id', id);
}

async function insert(ticket) {
    const [id] = await db('tickets').insert(ticket, 'id');
    return getById(id);
}

function update(changes, id) {
    return db('tickets').where({ id }).update(changes).then(count => {
        return getById(id);
    });
}

function remove(id) {
    return db('tickets').where({ id }).del();
}