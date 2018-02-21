const getBooksFromAws = require('./getBooksFromAws');
const insertAndGetBooks = require('./insertAndGetBooks');
const likeBooks = require('./likeBooks');
const getBooksFromDb = require('./getBooksFromDb');
const emptyBooksTable = require('./emptyBooksTable');

module.exports = [].concat(emptyBooksTable, getBooksFromDb, insertAndGetBooks, likeBooks, getBooksFromAws);
