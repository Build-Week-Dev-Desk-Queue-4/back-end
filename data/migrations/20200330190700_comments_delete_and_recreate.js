
exports.up = function(knex) {
    return knex.schema.dropTableIfExists('comments').createTable('comments', tbl => {
        tbl.increments().unsigned();
        tbl.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer('commenter_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.text('comment').notNullable();
        tbl.boolean('is_solution').defaultTo(false).notNullable();
    });;
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments').createTable('comments', tbl => {
        tbl.increments().unsigned();
        tbl.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets').onDelete('RESTRICT').onUpdate('CASCADE');
        tbl.integer('commenter_id').unsigned().notNullable().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
        tbl.text('comment').notNullable();
        tbl.boolean('is_solution').defaultTo(false).notNullable();
    });
};
