const Models = require('../../models');

function handler(req, reply) {
  Models.Books.destroy({ truncate: true }).then(() => {
    reply('books table cleared');
  });
}

module.exports = [{
  method: 'GET',
  path: '/emptyBooksTable',
  handler,
},
];

