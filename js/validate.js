'use strict';

(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var uploadFormElement = document.querySelector('.upload-form');
  var uploadSubmitElement = uploadFormElement.querySelector('.upload-form-submit');
  var hashtagsElement = uploadFormElement.querySelector('.upload-form-hashtags');
  var hashtagsErrorElement = uploadFormElement.querySelector('.upload-form-hashtags-error');
  var validators = [
    function (hashtagsObject) {
      return hashtagsObject.hashtag[0] === '#' ? false : 'Хэш-тег должен начинается с символа # (решётка)';
    },
    function (hashtagsObject) {
      return hashtagsObject.hashtag.length > 1 ? false : 'Хэш-тег не может содержать только символ # (решётка)';
    },
    function (hashtagsObject) {
      return hashtagsObject.hashtag.length <= MAX_HASHTAG_LENGTH ? false : 'Длина хэш-тега не может превышать 20 символов';
    },
    function (hashtagsObject) {
      return hashtagsObject.hashtag.substring(1).search('#') === -1 ? false : 'Хэш-тег не должен содержать несколько символов # (решётка)';
    },
    function (hashtagsObject) {
      return hashtagsObject.hashtags.includes(hashtagsObject.hashtag, hashtagsObject.i + 1) === false ? false : 'Хэш-теги не могут повторяться';
    },
  ];

  var setCustomValidity = function (errorText) {
    hashtagsElement.style.border = '1px red solid';
    hashtagsErrorElement.textContent = errorText;
  };

  var clearHashtagsError = function () {
    hashtagsElement.style.border = '';
    hashtagsErrorElement.textContent = '';
  };

  var validateHashtags = function () {
    var hashtags = hashtagsElement.value.trim();
    if (hashtags !== '') {
      hashtags = hashtags.split(/\s+/);
      if (hashtags.length > 5) {
        setCustomValidity('Хэш-тегов не может быть более пяти');
        return false;
      }
      hashtags = hashtags.map(function (item) {
        return item.toLowerCase();
      });
      for (var i = 0; i < hashtags.length; i++) {
        for (var j = 0; j < validators.length; j++) {
          var error = validators[j]({hashtag: hashtags[i], hashtags: hashtags, i: i});
          if (error) {
            setCustomValidity(error);
            return false;
          }
        }
      }
    }
    clearHashtagsError();
    return true;
  };

  var onHashtagsKeyup = function () {
    validateHashtags();
  };

  hashtagsElement.addEventListener('keyup', onHashtagsKeyup);

  var onUploadSubmitClick = function (evt) {
    evt.preventDefault();
    if (validateHashtags()) {
      uploadFormElement.submit();
    }
  };

  uploadSubmitElement.addEventListener('click', onUploadSubmitClick);

  window.validate = {
    clearHashtagsError: clearHashtagsError
  };
})();
