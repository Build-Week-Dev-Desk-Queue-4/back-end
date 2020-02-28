
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets').del()
    .then(function () {
      // Inserts seed entries
      return knex('tickets').insert([
        {id: 1, asker_id: 1, title: 'boilerplate?', description: "It's difficult to remember all the stuff you have to write to create an html file. Stuff like meta and head. Is there a boilerplate I can copy?", category: 'HTML'},
        {id: 2, asker_id: 1, title: 'Animation will not work', description: 'I am trying to make a slide down animation for my navbar menu. I cannot get it to work.', category: 'CSS'},
        {id: 3, asker_id: 2, title: 'Babel error?', description: 'I created a CRA template, but the app will not run. It is saying something about a babel conflct or something.', category: 'React'},
        {id: 4, asker_id: 2, title: 'Using actions with hooks', description: 'I have a project that uses redux with actions, but I want to refactor it to use the useDispatch hook. How can I still use my actions with the useDispatch hook?', category: 'Redux'},
        {id: 5, asker_id: 3, title: 'oops! Merged to the wrong repo', description: 'I made a pull request to the Lambda repo by accident. I panicked and then accidentally merged the request. can someone help me, please!!!', category: 'Git'},
        {id: 6, asker_id: 4, title: 'I am completely lost', description: 'I am trying to test our code for the project today, but I am new to testing and nothing makes sense.', category: 'testing'},
        {id: 7, asker_id: 5, title: 'cannot map over undefined?', description: 'I am trying to map over an array to create a list, but I am getting an error.', category: 'JavaScript'},
        {id: 8, asker_id: 6, title: 'Trouble with foreign keys', description: 'I am trying to seed my tables but I am getting an error about some SQL foreign key constraint?', category: 'SQL'},
        {id: 9, asker_id: 7, title: 'knex command not found', description: 'I am trying to create my tables with Knex, but I am getting an error saying that the command is not found.', category: 'Yarn/npm'},
        {id: 10, asker_id: 5, title: 'Node cheatsheet', description: 'I am loving the back-end unit so far, but I get lost when I try to create a project from scratch. Is there some kind of guide or cheatsheet online?', category: 'Node'}
      ]);
    });
};
