'use strict';

(function () {
  var uploadFormElement = document.querySelector('.upload-form');
  var uploadFileElement = uploadFormElement.querySelector('#upload-file');
  var uploadOverlayElement = uploadFormElement.querySelector('.upload-overlay');
  var uploadOverlayCancelElement = uploadFormElement.querySelector('.upload-form-cancel');
  var formDescroptionElement = uploadFormElement.querySelector('.upload-form-description');
  var effectImageElement = uploadFormElement.querySelector('.effect-image-preview');
  var hashtagsElement = uploadFormElement.querySelector('.upload-form-hashtags');

  var showPreviewImg = function (file) {
    if (file.type.match(/image.*/)) {
      var reader = new FileReader();
      reader.addEventListener('load', function (evt) {
        effectImageElement.src = evt.target.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onUploadOverlayEscPress = function (evt) {
    if (window.util.isEscEvent(evt) && evt.target !== formDescroptionElement) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    showPreviewImg(uploadFileElement.files[0]);
    uploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
  };

  var closeUploadOverlay = function () {
    uploadOverlayElement.classList.add('hidden');
    uploadFileElement.value = '';
    hashtagsElement.value = '';
    formDescroptionElement.value = '';
    window.validate.clearHashtagsError();
    window.effect.setDefault();
    window.effect.setDefaultLevel();
    window.scale.setDefault();
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  uploadFileElement.addEventListener('change', function () {
    openUploadOverlay();
  });

  uploadOverlayCancelElement.addEventListener('click', function () {
    closeUploadOverlay();
  });
})();
