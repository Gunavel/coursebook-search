import _isEmptyObject from './is-empty-object';

describe('_isEmptyObject', () => {
  test('should return true if object does not have any properties', () => {
    const obj = {};
    expect(_isEmptyObject(obj)).toEqual(true);
  });

  test('should return false if input is a string', () => {
    const obj = '';
    expect(_isEmptyObject(obj)).toEqual(false);
  });

  test('should return false if input is an array', () => {
    const obj = [];
    expect(_isEmptyObject(obj)).toEqual(false);
  });

  test('should return false if obj has some properties', () => {
    const obj = {
      a: '1',
    };
    expect(_isEmptyObject(obj)).toEqual(false);
  });
});
