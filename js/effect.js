'use strict';

(function () {
  var DEFAULT_EFFECT = 'none';
  var CLASS_EFFECT_PREFIX = 'effect-';
  var DEFAULT_SLIDER_RANGE = 100;
  var uploadFormElement = document.querySelector('.upload-form');
  var elementsData = [
    {elementName: 'effect', selector: '.upload-effect-controls'},
    {elementName: 'effectLevel', selector: '.upload-effect-level'},
    {elementName: 'effectImage', selector: '.effect-image-preview'},
    {elementName: 'effectLevelPin', selector: '.upload-effect-level-pin'},
    {elementName: 'effectLevelLine', selector: '.upload-effect-level-line'},
    {elementName: 'effectLevelValue', selector: '.upload-effect-level-value'},
    {elementName: 'effectLevelVal', selector: '.upload-effect-level-val'}
  ];
  var effects = {
    chrome: function () {
      return 'grayscale(' + getEffectLevelValue() / 100 + ')';
    },
    sepia: function () {
      return 'sepia(' + getEffectLevelValue() / 100 + ')';
    },
    marvin: function () {
      return 'invert(' + getEffectLevelValue() + '%)';
    },
    phobos: function () {
      return 'blur(' + 3 * getEffectLevelValue() / 100 + 'px)';
    },
    heat: function () {
      return 'brightness(' + 3 * getEffectLevelValue() / 100 + ')';
    },
    none: function () {
      return '';
    },
  };

  var uploadElements = window.util.queryElements(elementsData, uploadFormElement);

  var calculateEffectLevel = function () {
    return Math.round(uploadElements.effectLevelPin.offsetLeft / uploadElements.effectLevelLine.offsetWidth * 100);
  };

  var getCurrentEffect = function () {
    return uploadElements.effectImage.dataset.effect;
  };

  var setSliderVisibility = function () {
    if (getCurrentEffect() === DEFAULT_EFFECT) {
      uploadElements.effectLevel.classList.add('hidden');
      return;
    }
    uploadElements.effectLevel.classList.remove('hidden');
  };

  var setCurrentEffect = function (effectName) {
    uploadElements.effectImage.classList.remove(CLASS_EFFECT_PREFIX + getCurrentEffect());
    uploadElements.effectImage.classList.add(CLASS_EFFECT_PREFIX + effectName);
    uploadElements.effectImage.dataset.effect = effectName;
    setSliderVisibility();
  };

  var setEffectLevelValue = function (levelValue) {
    uploadElements.effectLevelValue.value = levelValue;
  };

  var getEffectLevelValue = function () {
    return uploadElements.effectLevelValue.value;
  };

  var setFilter = function () {
    uploadElements.effectImage.style.filter = effects[getCurrentEffect()]();
  };

  var setSliderPinPosition = function (levelProc) {
    uploadElements.effectLevelVal.style.width = levelProc + '%';
    uploadElements.effectLevelPin.style.left = levelProc + '%';
  };

  var setEffectLevel = function (level) {
    setEffectLevelValue(level);
    setSliderPinPosition(level);
    setFilter();
  };

  var setDefaultEffect = function () {
    setCurrentEffect(DEFAULT_EFFECT);
  };

  var setDefaultEffectLevel = function () {
    setEffectLevel(DEFAULT_SLIDER_RANGE);
  };

  var onEffectLevelPinMouseUp = function () {
    setEffectLevel(calculateEffectLevel());
  };

  var onEffectClick = function (evt) {
    var newEffectName = evt.target.value;
    if (newEffectName && newEffectName !== getCurrentEffect()) {
      setCurrentEffect(newEffectName);
      setDefaultEffectLevel();
    }
  };

  uploadElements.effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseUp);
  uploadElements.effect.addEventListener('click', onEffectClick);

  window.effect = {
    setDefault: setDefaultEffect,
    setDefaultLevel: setDefaultEffectLevel
  };

})();
