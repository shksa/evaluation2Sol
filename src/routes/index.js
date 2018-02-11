const getBooks = require('./getBooks');
const insertBooks = require('./insertBooks');
const likeBooks = require('./likeBooks');

module.exports = [].concat(getBooks, insertBooks, likeBooks);
