const users = require('../../users/userModel');
const tickets = require('../../tickets/ticketModel');

module.exports = async ticket => {
    let solver = ticket.solved_by;
    let assignee = ticket.assignee;
    let assigner = ticket.assigned_by;
    const asker = await users.getById(ticket.asker_id);
    delete ticket.asker_id;
    if (ticket.solved_by) {
        solver = await users.getById(ticket.solved_by);
    }
    if (ticket.assignee) {
        assignee = await users.getById(ticket.assignee);
    }
    if (ticket.assigned_by) {
        assigner = await users.getById(ticket.assigned_by);
    }
    const comments = await tickets.getComments(ticket.id);
    //convert 0/1 values to false/true
    ticket.resolved === 0 ? ticket.resolved = false : ticket.resolved = true;
    ticket.being_solved === 0 ? ticket.being_solved = false : ticket.being_solved = true;
    comments.forEach(comment => {
        comment.is_solution === 0 ? comment.is_solution = false : comment.is_solution = true;
        return comment;
    });
    return { ...ticket, asker: asker, solved_by: solver, assignee: assignee, assigned_by: assigner, comments: comments };
}