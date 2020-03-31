
exports.up = function(knex) {
    return knex.schema.alterTable('comments', table => {
        table.integer('ticket_id').onDelete('CASCADE').alter();
        table.integer('commenter_id').onDelete('CASCADE').alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('comments', table => {
        table.integer('ticket_id').onDelete('RESTRICT').alter();
        table.integer('commenter_id').onDelete('RESTRICT').alter();
    });
};
