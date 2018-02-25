'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var loadErrorElement = document.querySelector('.download-error');

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

  var clearLoadErrors = function () {
    loadErrorElement.classList.add('hidden');
    loadErrorElement.textContent = '';
  };

  var showLoadErrors = function (errorMessage) {
    loadErrorElement.textContent = errorMessage;
    loadErrorElement.classList.remove('hidden');
  };

  var getRandomArrayElement = function (list) {
    return list[getRandomBetween(0, list.length)];
  };

  var getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var imitateClick = function (evt) {
    if (isEnterEvent(evt)) {
      evt.target.click();
    }
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    queryElements: queryElements,
    clearLoadErrors: clearLoadErrors,
    showLoadErrors: showLoadErrors,
    getRandomArrayElement: getRandomArrayElement,
    getRandomBetween: getRandomBetween,
    imitateClick: imitateClick
  };
})();
