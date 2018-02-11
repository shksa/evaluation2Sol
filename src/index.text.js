const Server = require('./index');
const API1response = require('./API1response');

describe('basic server tests', () => {
  // test('should return pong', () => {
  //   const options = {
  //     method: 'GET',
  //     url: '/ping',
  //   };
  //   Server.inject(options, (response) => {
  //     expect(response.result).toBe('pong');
  //   });
  // });

  test('should return corret response for api1', () => {
    const options = {
      method: 'GET',
      url: '/getBooks',
    };
    Server.inject(options, (response) => {
      expect(response.result).toEqual(API1response);
    });
  });
});
