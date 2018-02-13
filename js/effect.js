'use strict';

(function () {
  var DEFAULT_EFFECT = 'none';
  var PREFIX_FOR_CLASS_EFFECT = 'effect-';
  var DEFAULT_SLIDER_RANGE = 100;
  var uploadFormElement = document.querySelector('.upload-form');
  var uploadEffectElement = uploadFormElement.querySelector('.upload-effect-controls');
  var uploadEffectLevelElement = uploadFormElement.querySelector('.upload-effect-level');
  var effectImageElement = uploadFormElement.querySelector('.effect-image-preview');
  var uploadEffectLevelPinElement = uploadEffectLevelElement.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelLineElement = uploadEffectLevelElement.querySelector('.upload-effect-level-line');
  var uploadEffectLevelValue = uploadEffectLevelElement.querySelector('.upload-effect-level-value');
  var uploadEffectLevelValElement = uploadEffectLevelElement.querySelector('.upload-effect-level-val');
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

  var calculateEffectLevel = function () {
    return Math.round(uploadEffectLevelPinElement.offsetLeft / uploadEffectLevelLineElement.offsetWidth * 100);
  };

  var getCurrentEffect = function () {
    return effectImageElement.dataset.effect;
  };

  var setSliderVisibility = function () {
    if (getCurrentEffect() === DEFAULT_EFFECT) {
      uploadEffectLevelElement.classList.add('hidden');
      return;
    }
    uploadEffectLevelElement.classList.remove('hidden');
  };

  var setCurrentEffect = function (effectName) {
    effectImageElement.classList.remove(PREFIX_FOR_CLASS_EFFECT + getCurrentEffect());
    effectImageElement.classList.add(PREFIX_FOR_CLASS_EFFECT + effectName);
    effectImageElement.dataset.effect = effectName;
    setSliderVisibility();
  };

  var setEffectLevelValue = function (levelValue) {
    uploadEffectLevelValue.value = levelValue;
  };

  var getEffectLevelValue = function () {
    return uploadEffectLevelValue.value;
  };

  var setFilter = function () {
    effectImageElement.style.filter = effects[getCurrentEffect()]();
  };

  var setSliderPinPosition = function (levelProc) {
    uploadEffectLevelValElement.style.width = levelProc + '%';
    uploadEffectLevelPinElement.style.left = levelProc + '%';
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
  
  uploadEffectLevelPinElement.addEventListener('mouseup', onEffectLevelPinMouseUp);
  uploadEffectElement.addEventListener('click', onEffectClick);

  window.effect = {
    setDefault: setDefaultEffect,
    setDefaultLevel: setDefaultEffectLevel
  };
  
})();
