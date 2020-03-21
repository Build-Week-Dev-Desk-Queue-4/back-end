const db = require('../data/dbConfig');

module.exports = {
    getById,
    insert,
    update,
    remove
}

//get comment by comment id
function getById(id) {
    return db('comments as c')
        .join('users as u', 'u.id', 'c.commenter_id')
        .select('c.id', 'u.role','c.commenter_id', 'u.username', 'u.image', 'u.first_name', 'u.last_name', 'c.comment', 'c.is_solution')
        .where('c.id', id).first();
}

async function insert(comment) {
    const [id] = await db('comments').insert(comment, 'id');
    return getById(id);
}

function update(changes, id) {
    return db('comments').where({ id }).update(changes).then(count => {
        return getById(id);
    });
}

async function remove(id) {
    const deletedComment = await getById(id);
    await db('comments').where({ id }).del();
    return deletedComment;
}