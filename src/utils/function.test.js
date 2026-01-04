import sayHello from './function';

test('Creates a greeting', () => {
  expect(sayHello('Lera', 'Jackson')).toBe('Hello, Lera Jackson!');
});
