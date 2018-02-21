const Models = require('../../models');

function handler(request, reply) {
  Models.Books.findAll().then((booksTableRecordsArray) => {
    if (booksTableRecordsArray.length === 0) {
      reply('books not found');
    } else {
      console.log('non-empty table, sending to frontend');
      const allBooksWithRatingsGroupedByAuthor =
      booksTableRecordsArray.reduce((accumulator, book) => {
        const {
          author, bookId, name, rating,
        } = book;
        accumulator[author] = accumulator[author] || [];
        accumulator[author].push({
          author, bookId, name, rating,
        });
        return accumulator;
      }, {});
      reply(allBooksWithRatingsGroupedByAuthor).code(200);
    }
  });
}

module.exports = [{
  method: 'GET',
  path: '/getBooksFromDb',
  handler,
},
];
