'use strict';

(function() {
 
  window.debounce = function(fn, timeout) {
    var timer;
    return function() {
      var args = arguments;
      var ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
        timer = null;
      }, timeout);
    };
  };

})();
