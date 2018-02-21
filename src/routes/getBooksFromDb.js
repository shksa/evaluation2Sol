const Models = require('../../models');

const rp = require('request-promise');

function getPromiseResponseFrom(url) {
  const promise = rp(url);
  return promise;
}

function handler(request, reply) {
  Models.Books.findAll().then((booksTableRecordsArray) => {
    reply(booksTableRecordsArray);
  });
}

module.exports = [{
  method: 'GET',
  path: '/getBooksFromDb',
  handler,
},
];
