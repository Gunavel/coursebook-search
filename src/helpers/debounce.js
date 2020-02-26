function _debounce(fn, wait) {
  let timer;
  return function executedFunction() {
    const ctx = this;
    const args = arguments;

    const later = function() {
      timer = null;
      fn.apply(ctx, args);
    };

    clearTimeout(timer);
    timer = setTimeout(later, wait);
  };
}

export default _debounce;
