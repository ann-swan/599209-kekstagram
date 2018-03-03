'use strict';

(function () {
  var SCALE_RANGE = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var DEFAULT_SCALE = 100;
  var elementsData = [
    {elementName: 'image', selector: '.effect-image-preview'},
    {elementName: 'scaleValue', selector: '.upload-resize-controls-value'},
    {elementName: 'scaleBtnDec', selector: '.upload-resize-controls-button-dec'},
    {elementName: 'scaleBtnInc', selector: '.upload-resize-controls-button-inc'}
  ];

  var uploadElements = window.util.queryElements(elementsData, window.form.element);

  var getScaleValue = function () {
    return Number(uploadElements.scaleValue.value.slice(0, -1));
  };

  var setScaleValue = function (scaleValue) {
    uploadElements.scaleValue.value = scaleValue + '%';
    uploadElements.image.style.transform = 'scale(' + scaleValue / 100 + ')';
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

  uploadElements.scaleBtnDec.addEventListener('click', onScaleBtnDecClick);
  uploadElements.scaleBtnInc.addEventListener('click', onScaleBtnIncClick);

  window.scale = {
    setDefault: setDefaultScale
  };
})();
