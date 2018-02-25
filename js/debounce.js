'use strict';

(function () {

  window.debounce = function(fn, timeout, ctx) {
    var timer;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
        timer = null;
      }, timeout);
    };
  };

})();
