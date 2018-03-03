'use strict';

(function () {
  var DEFAULT_EFFECT = 'none';
  var CLASS_EFFECT_PREFIX = 'effect-';
  var DEFAULT_SLIDER_RANGE = 100;
  var MIN_EFFECT_VALUE = 0.6;
  var MAX_EFFECT_VALUE = 3;
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
      return 'blur(' + ((getEffectLevelValue() / 100) * (MAX_EFFECT_VALUE - MIN_EFFECT_VALUE) + MIN_EFFECT_VALUE).toFixed(2) + 'px)';
    },
    heat: function () {
      return 'brightness(' + MAX_EFFECT_VALUE * getEffectLevelValue() / 100 + ')';
    },
    none: function () {
      return '';
    },
  };

  var uploadElements = window.util.queryElements(elementsData, window.form.element);

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

  var onEffectClick = function (evt) {
    var newEffectName = evt.target.value;
    if (newEffectName && newEffectName !== getCurrentEffect()) {
      setCurrentEffect(newEffectName);
      setDefaultEffectLevel();
    }
  };

  var setPinEffectLevel = function () {
    setEffectLevel(calculateEffectLevel());
  };

  uploadElements.effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;
    var minOffset = 0;
    var maxOffset = uploadElements.effectLevelLine.offsetWidth;
    var effectLineCoords = uploadElements.effectLevelLine.getBoundingClientRect();

    var onEffectLevelPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;
      var pinShift = uploadElements.effectLevelPin.offsetLeft - shift;

      if (startCoordX < effectLineCoords.left) {
        pinShift = minOffset;
      } else if (startCoordX > effectLineCoords.right) {
        pinShift = maxOffset;
      }

      uploadElements.effectLevelPin.style.left = pinShift + 'px';
      uploadElements.effectLevelVal.style.width = pinShift + 'px';
      setPinEffectLevel();
    };

    var onEffectLevelPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setPinEffectLevel();
      document.removeEventListener('mousemove', onEffectLevelPinMouseMove);
      document.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    };

    document.addEventListener('mousemove', onEffectLevelPinMouseMove);
    document.addEventListener('mouseup', onEffectLevelPinMouseUp);
  });

  uploadElements.effect.addEventListener('change', onEffectClick);

  uploadElements.effect.addEventListener('keydown', function (evt) {
    window.util.imitateClick(evt);
  });

  window.effect = {
    setDefault: setDefaultEffect,
    setDefaultLevel: setDefaultEffectLevel
  };

})();
