import {sha256Hash} from './utils';

test('should return true when hash value equals for the given input', () => {
  expect(sha256Hash('Test')).toStrictEqual(sha256Hash('Test'));
});

test('should return true when hash value not equals for the given input', () => {
  expect(sha256Hash('Test')).not.toEqual(sha256Hash('test'));
});
