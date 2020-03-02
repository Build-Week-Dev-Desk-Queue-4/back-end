
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments().unsigned();
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
        tbl.string('role').notNullable().index();
        tbl.string('first_name').notNullable();
        tbl.string('last_name').notNullable();
        tbl.string('email').notNullable();
    }).createTable('tickets', tbl => {
        tbl.increments().unsigned();
        tbl.integer('asker_id').unsigned().notNullable().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
        tbl.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
        tbl.string('title').notNullable();
        tbl.text('description').notNullable();
        tbl.string('category').notNullable().index();
        tbl.boolean('resolved').defaultTo(false).notNullable();
        tbl.boolean('being_solved').defaultTo(false).notNullable();
        tbl.integer('solved_by').unsigned().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
        //if we allow team leads to ge assigned tasks
        tbl.integer('assignee').unsigned().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
        //Would allow the team lead to see who assigned them the task
        tbl.integer('assigned_by').unsigned().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
    }).createTable('comments', tbl => {
        tbl.increments().unsigned();
        tbl.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets').onDelete('RESTRICT').onUpdate('CASCADE');
        tbl.integer('commenter_id').unsigned().notNullable().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
        tbl.text('comment').notNullable();
        tbl.boolean('is_solution').defaultTo(false).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments')
    .dropTableIfExists('tickets')
    .dropTableIfExists('users');
};
