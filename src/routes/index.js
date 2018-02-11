const getBooks = require('./getBooks');
const insertBooks = require('./insertBooks');

module.exports = [].concat(getBooks, insertBooks);
