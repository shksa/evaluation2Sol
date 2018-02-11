
const Models = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/like/{bookId}/{likeState}',
  handler: (request, reply) => {
    // console.log(request.params);
    const BOOKID = Number(request.params.bookId);
    const newState = Number(request.params.likeState);
    Models.Likes.findOne({
      where: {
        bookId: BOOKID,
      },
    })
      .then((record) => {
        record.update({
          likeState: newState,
        }, {
          where: {
            bookId: BOOKID,
          },
        })
          .then(result => reply(result));
      });
    // reply('pong');
  },
},
{
  method: 'GET',
  path: '/showLikes',
  handler: (request, reply) => {
    Models.Likes.findAll().then((likeTableRecordsArray) => {
      reply(likeTableRecordsArray);
    });
  },
},
];
