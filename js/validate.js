'use strict';

(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var uploadFormElement = document.querySelector('.upload-form');
  var elementsData = [
    {elementName: 'formSubmit', selector: '.upload-form-submit'},
    {elementName: 'hashtags', selector: '.upload-form-hashtags'},
    {elementName: 'hashtagsError', selector: '.upload-form-hashtags-error'}
  ];
  var validators = [
    function (data) {
      return data.hashtag[0] === '#' ? false : 'Хэш-тег должен начинается с символа # (решётка)';
    },
    function (data) {
      return data.hashtag.length > 1 ? false : 'Хэш-тег не может содержать только символ # (решётка)';
    },
    function (data) {
      return data.hashtag.length <= MAX_HASHTAG_LENGTH ? false : 'Длина хэш-тега не может превышать 20 символов';
    },
    function (data) {
      return data.hashtag.substring(1).search('#') === -1 ? false : 'Хэш-тег не должен содержать несколько символов # (решётка)';
    },
    function (data) {
      return data.hashtags.includes(data.hashtag, data.i + 1) === false ? false : 'Хэш-теги не могут повторяться';
    },
  ];

  var uploadElements = window.util.queryElements(elementsData, uploadFormElement);

  var setCustomValidity = function (errorText) {
    uploadElements.hashtags.style.border = '1px red solid';
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
    if (hashtags.length > 5) {
      setCustomValidity('Хэш-тегов не может быть более пяти');
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
    validateHashtags: validateHashtags,
    clearHashtagsError: clearHashtagsError
  };
})();
