
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    {id: 1, username: 'hendrix', password: '6Pay#D@7', role: 'student', first_name: 'jimi', last_name: 'Hendrix', email: 'heresjimi@hotmail.com'},
    {id: 2, username: 'clapton', password: '^wqPD4RY', role: 'student', first_name: 'Eric', last_name: 'clapton', email: 'ladytone@gmail.com'},
    {id: 3, username: 'jimmy', password: 'V3k8QQ@F', role: 'student', first_name: 'Jimmy', last_name: 'Page', email: 'turnthepage@yahoo.com'},
    {id: 4, username: 'vanhalen', password: 'D*@z3U5F', role: 'student', first_name: 'Eddie', last_name: 'Van Halen', email: 'supertapper666@aol.com'},
    {id: 5, username: 'richars', password: 'uTS9!Rq8', role: 'student', first_name: 'Keith', last_name: 'Richards', email: 'keefers@gmail.com'},
    {id: 6, username: 'beck', password: '^XL27*k?', role: 'student', first_name: 'Jeff', last_name: 'Beck', email: 'beckmeup@buttercup.com'},
    {id: 7, username: 'king', password: '+YP=Bs8H', role: 'student', first_name: 'BB', last_name: 'King', email: 'igottheblues@outlook.com'},
    {id: 8, username: 'berry', password: '3P-NpRHD', role: 'team lead', first_name: 'Chuck', last_name: 'Berry', email: 'thebestthateverdidit@gmail.com'},
    {id: 9, username: 'santana', password: 'ZL%JUt9W', role: 'team lead', first_name: 'Carlos', last_name: 'Santana', email: 'guitarhero@live.com'},
    {id: 10, username: 'slash', password: 'c3&7EsEM', role: 'section lead', first_name: 'Slashel', last_name: 'Rose', email: 'sweetchild@mine.com'}
  ]);
};
