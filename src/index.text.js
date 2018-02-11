const Server = require('./index');

describe('basic server tests', () => {
  test('should return pong', () => {
    const options = {
      method: 'GET',
      url: '/ping',
    };
    Server.inject(options, (response) => {
      expect(response.result).toBe('pong');
    });
  });

  // test('', () => {
  //   expect().toBe();
  // });
});
