import _debounce from './debounce';

// tell jest to mock all timeout functions
jest.useFakeTimers();

describe('debounce', () => {
  let func;
  let debouncedFunc;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = _debounce(func, 1000);
  });

  test('execute just once', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    // fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });
});
