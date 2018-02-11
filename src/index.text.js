const Server = require('./index');
const API1response = require('./API1response');
const Models = require('../models');

jest.setTimeout(10000);
describe('api1 tests', () => {
  test('should return 200 code', () => {
    const options = {
      method: 'GET',
      url: '/getBooks',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
    });
  });

  test('should return correct response for api1', () => {
    const options = {
      method: 'GET',
      url: '/getBooks',
    };
    Server.inject(options, (response) => {
      expect(response.result).toEqual(API1response);
    });
  });
});

describe('api 2 test', () => {
  test('should return 200 code', (done) => {
    const options = {
      method: 'POST',
      url: '/insertBooks',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('call #1 should insert 12 records in Books table and table should contain 12 records', (done) => {
    const options = {
      method: 'POST',
      url: '/insertBooks',
    };
    Server.inject(options, (response) => {
      // console.log(response);
      expect(response.result.books.length).toEqual(12);
      Models.Books.findAll().then((records) => {
        expect(records.length).toBe(12);
        done();
      });
    });
  });

  test('call #2 should insert 12 records in Books table and table should contain 12 records', (done) => {
    const options = {
      method: 'POST',
      url: '/insertBooks',
    };
    Server.inject(options, (response) => {
      // console.log(response);
      expect(response.result.books.length).toEqual(12);
      Models.Books.findAll().then((records) => {
        expect(records.length).toBe(12);
        done();
      });
    });
  });
});

describe('testing api3', () => {
  test('should return 200 code', (done) => {
    const options = {
      method: 'POST',
      url: '/like/4/2',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('should change like status of bookId = 8 to 2', (done) => {
    const options = {
      method: 'POST',
      url: '/like/8/2',
    };
    Server.inject(options, (response) => {
      expect(response.result.dataValues.likeState).toBe(2);
      done();
    });
  });

  test('should change like status of bookId = 8 to 1', (done) => {
    const options = {
      method: 'POST',
      url: '/like/8/1',
    };
    Server.inject(options, (response) => {
      expect(response.result.dataValues.likeState).toBe(1);
      done();
    });
  });

  test('likeStatus of bookId = 8 should be 1', (done) => {
    const options = {
      method: 'GET',
      url: '/showLikes',
    };
    Server.inject(options, (response) => {
      const recordsArray = response.result;
      const recordOfbookId8 = recordsArray.filter((record) => {
        if (record.dataValues.bookId === 8) {
          return true;
        }
        return false;
      });
      // console.log(recordOfbookId8);
      expect(recordOfbookId8[0].dataValues.likeState).toBe(1);
      done();
    });
  });
});
