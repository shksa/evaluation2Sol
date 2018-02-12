
const Models = require('../../models');

function handler(request, reply) {
  // console.log(request.params);
  const bookId = Number(request.params.bookId);
  const newState = Number(request.params.likeState);
  Models.Likes.upsert({
    id: bookId,
    bookId,
    likeState: newState,
  }).then((value) => {
    if (value) {
      reply('Created').code(201);
    } else {
      reply('Updated').code(200);
    }
  });
}

module.exports = [{
  method: 'POST',
  path: '/like/{bookId}/{likeState}',
  handler,
},
{
  method: 'GET',
  path: '/showLikes',
  handler: (request, reply) => {
    Models.Likes.findAll().then((likesTableRecordsArray) => {
      reply(likesTableRecordsArray);
    });
  },
},
];
