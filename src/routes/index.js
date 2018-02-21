const getBooksFromAws = require('./getBooksFromAws');
const insertBooks = require('./insertBooks');
const likeBooks = require('./likeBooks');
const getBooksFromDb = require('./getBooksFromDb');

module.exports = [].concat(getBooksFromDb, insertBooks, likeBooks, getBooksFromAws);
