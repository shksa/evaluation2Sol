const rp = require('request-promise');
const Models = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/insertBooks',
  handler: (request, reply) => {
    Models.Books.destroy({ truncate: true });
    Models.Likes.destroy({ truncate: true });
    const allBooksAPI = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
    const allBooksPromise = rp(allBooksAPI);
    allBooksPromise.then((allBooks) => {
      const allBooksArray = JSON.parse(allBooks).books;
      const ratingsAPI = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';
      const promiseArray = [];
      allBooksArray.forEach((book) => {
        const bookId = book.id;
        const ratingPromise = rp(`${ratingsAPI}${bookId}`);
        promiseArray.push(ratingPromise);
      });
      const allRatingsArrayPromise = Promise.all(promiseArray);
      const allBooksWithRatingsArray = [];
      allRatingsArrayPromise.then((allRatingsInStrArray) => {
        const allRatingsArray = allRatingsInStrArray.map(JSONstring => JSON.parse(JSONstring));
        for (let i = 0; i < allRatingsArray.length; i += 1) {
          const bookWithRating = { ...allBooksArray[i], ...allRatingsArray[i] };
          allBooksWithRatingsArray.push(bookWithRating);
        }
        const BooksTableInsertPromiseArray = [];
        const LikesTableInsertPromiseArray = [];
        allBooksWithRatingsArray.forEach((book) => {
          const BooksTableInsertPromise = Models.Books.create({
            author: book.Author,
            bookId: book.id,
            name: book.Name,
            rating: book.rating,
          });
          const LikesTableInsertPromise = Models.Likes.create({
            bookId: book.id,
            likeState: 0,
          });
          BooksTableInsertPromiseArray.push(BooksTableInsertPromise);
          LikesTableInsertPromiseArray.push(LikesTableInsertPromise);
        });
        Promise.all(BooksTableInsertPromiseArray).then((BooksTableRecordsArray) => {
          Promise.all(LikesTableInsertPromiseArray).then((LikesTableRecordsArray) => {
            reply({ books: BooksTableRecordsArray, likes: LikesTableRecordsArray });
            // reply('db populated');
          });
        });
      });
    });
  },
},
];
