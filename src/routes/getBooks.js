// https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks
// https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/{id}

const rp = require('request-promise');

module.exports = [{
  method: 'GET',
  path: '/getBooks',
  handler: (request, reply) => {
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
      allRatingsArrayPromise.then((allRatingsStrArray) => {
        const allRatingsArray = allRatingsStrArray.map(JSONstring => JSON.parse(JSONstring));
        for (let i = 0; i < allRatingsArray.length; i += 1) {
          const bookWithRating = { ...allBooksArray[i], ...allRatingsArray[i] };
          allBooksWithRatingsArray.push(bookWithRating);
        }
        const allBooksWithRatingsGroupedByAuthor =
        allBooksWithRatingsArray.reduce((accumulator, book) => {
          const author = book.Author;
          accumulator[author] = accumulator[author] || [];
          accumulator[author].push(book);
          return accumulator;
        }, {});
        // console.log(allBooksWithRatingsGroupedByAuthor);
        reply(allBooksWithRatingsGroupedByAuthor);
      });
    });
  },
},
];
