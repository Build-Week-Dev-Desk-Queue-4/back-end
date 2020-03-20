
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    {id: 1, username: 'hendrix', password: '6Pay#D@7', role: 'student', first_name: 'jimi', last_name: 'Hendrix', email: 'heresjimi@hotmail.com', image: 'https://pbs.twimg.com/profile_images/687309377368383490/4LBGZWZk_400x400.jpg'},
    {id: 2, username: 'clapton', password: '^wqPD4RY', role: 'student', first_name: 'Eric', last_name: 'clapton', email: 'ladytone@gmail.com', image: 'https://i.pinimg.com/600x315/d6/a5/96/d6a596e166295cf649922278b403d06e.jpg'},
    {id: 3, username: 'jimmy', password: 'V3k8QQ@F', role: 'student', first_name: 'Jimmy', last_name: 'Page', email: 'turnthepage@yahoo.com', image: 'https://a.wattpad.com/useravatar/IamJimmyPage.256.32144.jpg'},
    {id: 4, username: 'vanhalen', password: 'D*@z3U5F', role: 'student', first_name: 'Eddie', last_name: 'Van Halen', email: 'supertapper666@aol.com', image: 'https://a.wattpad.com/useravatar/EddieVanHalen1955.256.421547.jpg'},
    {id: 5, username: 'richars', password: 'uTS9!Rq8', role: 'student', first_name: 'Keith', last_name: 'Richards', email: 'keefers@gmail.com', image: 'https://i.pinimg.com/originals/bb/02/04/bb02040cb863e5ecd80974b285330cd7.jpg'},
    {id: 6, username: 'beck', password: '^XL27*k?', role: 'student', first_name: 'Jeff', last_name: 'Beck', email: 'beckmeup@buttercup.com', image: 'https://pbs.twimg.com/profile_images/378800000150369070/5d546dd4e72f8b7f0f6810447cf45e2a.jpeg'},
    {id: 7, username: 'king', password: '+YP=Bs8H', role: 'student', first_name: 'BB', last_name: 'King', email: 'igottheblues@outlook.com', image: 'https://ih0.redbubble.net/image.7196850.2120/flat,128x,075,f-pad,128x128,f8f8f8.jpg'},
    {id: 8, username: 'berry', password: '3P-NpRHD', role: 'team lead', first_name: 'Chuck', last_name: 'Berry', email: 'thebestthateverdidit@gmail.com', image: 'https://pm1.narvii.com/6814/77a5a28fc7a59fc7731b168b5c240502de9a8a9cv2_128.jpg'},
    {id: 9, username: 'santana', password: 'ZL%JUt9W', role: 'team lead', first_name: 'Carlos', last_name: 'Santana', email: 'guitarhero@live.com', image: 'https://d1marr3m5x4iac.cloudfront.net/images/block/I0-001/004/209/895-2.jpeg_/santana-95.jpeg'},
    {id: 10, username: 'slash', password: 'c3&7EsEM', role: 'section lead', first_name: 'Slashel', last_name: 'Rose', email: 'sweetchild@mine.com', image: 'https://66.media.tumblr.com/a70d51d81fe78b949c120dc1447d447e/tumblr_mqeuenFchO1rcopueo4_400.jpg'}
  ]);
};
