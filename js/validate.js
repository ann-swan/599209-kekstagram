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

  var uploadElements = window.util.generateElements(elementsData, uploadFormElement);

  var setCustomValidity = function (errorText) {
    uploadElements.hashtags.style.border = '1px red solid';
    uploadElements.hashtagsError.textContent = errorText;
  };

  var clearHashtagsError = function () {
    uploadElements.hashtags.style.border = '';
    uploadElements.hashtagsError.textContent = '';
  };

  var validateHashtags = function () {
    var hashtags = uploadElements.hashtags.value.trim();
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

  uploadElements.hashtags.addEventListener('keyup', onHashtagsKeyup);

  var onUploadSubmitClick = function (evt) {
    evt.preventDefault();
    if (validateHashtags()) {
      uploadFormElement.submit();
    }
  };

  uploadElements.formSubmit.addEventListener('click', onUploadSubmitClick);

  window.validate = {
    clearHashtagsError: clearHashtagsError
  };
})();
