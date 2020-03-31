
exports.up = function(knex) {
    return knex.schema.alterTable('comments', table => {
        tbl.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets').onDelete('CASCADE').onUpdate('CASCADE').alter();
        tbl.integer('commenter_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE').alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('comments', table => {
        tbl.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets').onDelete('RESTRICT').onUpdate('CASCADE').alter();
        tbl.integer('commenter_id').unsigned().notNullable().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE').alter();
    });
};
