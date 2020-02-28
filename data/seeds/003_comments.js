
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {ticket_id: 1, commenter_id: 5, comment: 'I think there is a shortcut in vscode. Like you just type "html" and hit tab and it will auto generate.', is_solution: false},
        {ticket_id: 2, commenter_id: 2, comment: 'I think this is usually done by changing the height property.', is_solution: false},
        {ticket_id: 2, commenter_id: 2, comment: 'Also, make sure you set a transition time, too.', is_solution: false},
        {ticket_id: 3, commenter_id: 9, comment: 'Hi, this can usually be fixed by deleting your node modules folder and your lock file and then re-running yarn or npm.', is_solution: true},
        {ticket_id: 4, commenter_id: 4, comment: 'You can totally do it, I did it in my project.', is_solution: false},
        {ticket_id: 4, commenter_id: 2, comment: 'Thanks for the help...~', is_solution: false},
        {ticket_id: 5, commenter_id: 10, comment: "Let's hop in a zoom. We'll get it figured out.", is_solution: false},
        {ticket_id: 6, commenter_id: 1, comment: 'Testing sucks. Why is it so hard.', is_solution: false},
        {ticket_id: 6, commenter_id: 3, comment: 'Most junior devs are not expected to know it. I think Lambda is introducing it to us to get us started on the right track.', is_solution: false},
        {ticket_id: 6, commenter_id: 6, comment: 'A lot of people in my team are taking online courses in our off-time.', is_solution: false},
        {ticket_id: 7, commenter_id: 1, comment: 'Can you post a snippet of your code?', is_solution: false},
        {ticket_id: 8, commenter_id: 8, comment: 'This is usually due to having truncate instead of del when seeding your tables.', is_solution: true},
        {ticket_id: 9, commenter_id: 7, comment: 'Are you deploying from the right repo?', is_solution: false},
        {ticket_id: 9, commenter_id: 5, comment: 'Yea, this happened to me once when I had only pushed changes to my local branch and deployed to master.', is_solution: false},
        {ticket_id: 4, commenter_id: 10, comment: 'Play nice, guys.', is_solution: false},
      ]);
    });
};
