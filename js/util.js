'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isEnterEvent = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  var queryElements = function (data, element) {
    return data.reduce(function (previousValue, currentValue) {
      previousValue[currentValue.elementName] = element.querySelector(currentValue.selector);
      return previousValue;
    }, {});
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    queryElements: queryElements
  };
})();
