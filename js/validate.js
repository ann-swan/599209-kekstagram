'use strict';

(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS = 5;
  var HashtagError = {
    NO_SHARP_BEGIN: 'Хэш-тег должен начинается с символа # (решётка)',
    SHARP_ONLY: 'Хэш-тег не может содержать только символ # (решётка)',
    MAX_LENGTH: 'Длина хэш-тега не может превышать ' + MAX_HASHTAG_LENGTH + ' символов',
    MUCH_SHARPS: 'Хэш-тег не должен содержать несколько символов # (решётка)',
    REPEAT: 'Хэш-теги не могут повторяться',
    MAX_COUNT: 'Хэш-тегов не может быть более пяти'
  };
  var BORDER_ERROR_STYLE = '1px red solid';
  var uploadFormElement = document.querySelector('.upload-form');
  var elementsData = [
    {elementName: 'formSubmit', selector: '.upload-form-submit'},
    {elementName: 'hashtags', selector: '.upload-form-hashtags'},
    {elementName: 'hashtagsError', selector: '.upload-form-hashtags-error'}
  ];
  var validators = [
    function (data) {
      return data.hashtag[0] === '#' ? false : HashtagError.NO_SHARP_BEGIN;
    },
    function (data) {
      return data.hashtag.length > 1 ? false : HashtagError.SHARP_ONLY;
    },
    function (data) {
      return data.hashtag.length <= MAX_HASHTAG_LENGTH ? false : HashtagError.MAX_LENGTH;
    },
    function (data) {
      return data.hashtag.substring(1).search('#') === -1 ? false : HashtagError.MUCH_SHARPS;
    },
    function (data) {
      return data.hashtags.includes(data.hashtag, data.i + 1) === false ? false : HashtagError.REPEAT;
    },
  ];

  var uploadElements = window.util.queryElements(elementsData, uploadFormElement);

  var setCustomValidity = function (errorText) {
    uploadElements.hashtags.style.border = BORDER_ERROR_STYLE;
    uploadElements.hashtagsError.textContent = errorText;
  };

  var clearHashtagsError = function () {
    uploadElements.hashtags.style.border = '';
    uploadElements.hashtagsError.textContent = '';
  };

  var splitHashtags = function (hashtags) {
    return hashtags.trim().toLowerCase().split(/\s+/);
  };

  var validateHashtags = function () {
    clearHashtagsError();
    var hashtags = splitHashtags(uploadElements.hashtags.value);
    if (hashtags[0] === '') {
      return true;
    }
    if (hashtags.length > MAX_HASHTAGS) {
      setCustomValidity(HashtagError.MAX_COUNT);
      return false;
    }
    for (var i = 0; i < hashtags.length; i++) {
      for (var j = 0; j < validators.length; j++) {
        var error = validators[j]({hashtag: hashtags[i], hashtags: hashtags, i: i});
        if (error) {
          setCustomValidity(error);
          return false;
        }
      }
    }
    return true;
  };

  var onHashtagsKeyup = function () {
    validateHashtags();
  };

  uploadElements.hashtags.addEventListener('keyup', onHashtagsKeyup);

  window.validate = {
    hashtags: validateHashtags,
    clearHashtagsError: clearHashtagsError
  };
})();
