const getBooksFromAws = require('./getBooksFromAws');
const insertBooks = require('./insertBooks');
const likeBooks = require('./likeBooks');
const getBooksFromDb = require('./getBooksFromDb');
const emptyBooksTable = require('./emptyBooksTable');

module.exports = [].concat(emptyBooksTable, getBooksFromDb, insertBooks, likeBooks, getBooksFromAws);
