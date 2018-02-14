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

  var generateElements = function (data, element) {
    var obj = {};
    for (var i = 0; i < data.length; i++) {
      obj[data[i].elementName] = element.querySelector(data[i].selector);
    }
    return obj;
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    generateElements: generateElements
  };
})();
