'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE ? true : false;
  };

  var isEnterEvent = function (evt) {
    return evt.keyCode === ENTER_KEYCODE ? true : false;
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
