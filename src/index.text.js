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

// describe('api 2 test', () => {
//   test('should return 200 code', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/insertBooks',
//     };
//     Server.inject(options, (response) => {
//       expect(response.statusCode).toBe(200);
//       done();
//     });
//   });

//   test('call #1 should insert 12 records and DB should contain 12 records', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/insertBooks',
//     };
//     Server.inject(options, (response) => {
//       // console.log(response);
//       expect(response.result.length).toEqual(12);
//       Models.Books.findAll().then((records) => {
//         expect(records.length).toBe(12);
//         done();
//       });
//     });
//   });

//   test('call #2 should insert 12 records and DB should contain 12 records', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/insertBooks',
//     };
//     Server.inject(options, (response) => {
//       // console.log(response);
//       expect(response.result.length).toEqual(12);
//       Models.Books.findAll().then((records) => {
//         expect(records.length).toBe(12);
//         done();
//       });
//     });
//   });
// });
