// https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks
// https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/{id}

// const rp = require('request-promise');

module.exports = [{
  method: 'GET',
  path: '/ping',
  handler: (request, reply) => {
    reply('pong');
  },
},
];
