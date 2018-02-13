'use strict';

(function () {
  var SCALE_RANGE = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var DEFAULT_SCALE = 100;
  var uploadFormElement = document.querySelector('.upload-form');
  var effectImageElement = uploadFormElement.querySelector('.effect-image-preview');
  var scaleValueElement = uploadFormElement.querySelector('.upload-resize-controls-value');
  var scaleBtnDecElement = uploadFormElement.querySelector('.upload-resize-controls-button-dec');
  var scaleBtnIncElement = uploadFormElement.querySelector('.upload-resize-controls-button-inc');

  var getScaleValue = function () {
    return Number(scaleValueElement.value.slice(0, -1));
  };

  var setScaleValue = function (scaleValue) {
    scaleValueElement.value = scaleValue + '%';
    effectImageElement.style.transform = 'scale(' + scaleValue / 100 + ')';
  };

  var setDefaultScale = function () {
    setScaleValue(DEFAULT_SCALE);
  };

  var onScaleBtnDecClick = function () {
    var scale = getScaleValue();
    if (scale > MIN_SCALE) {
      setScaleValue(scale - SCALE_RANGE);
    }
  };

  var onScaleBtnIncClick = function () {
    var scale = getScaleValue();
    if (scale < MAX_SCALE) {
      setScaleValue(scale + SCALE_RANGE);
    }
  };

  scaleBtnDecElement.addEventListener('click', onScaleBtnDecClick);
  scaleBtnIncElement.addEventListener('click', onScaleBtnIncClick);

  window.scale = {
    setDefault: setDefaultScale
  };
})();
