'use strict';

(function () {
  var MESSAGE_TIME = 3000;
  var uploadFormElement = document.querySelector('.upload-form');
  var uploadErrorElement = document.querySelector('.download-error');
  var elementsData = [
    {elementName: 'uploadFile', selector: '#upload-file'},
    {elementName: 'overlay', selector: '.upload-overlay'},
    {elementName: 'formCancel', selector: '.upload-form-cancel'},
    {elementName: 'description', selector: '.upload-form-description'},
    {elementName: 'image', selector: '.effect-image-preview'},
    {elementName: 'hashtags', selector: '.upload-form-hashtags'},
    {elementName: 'uploadMessage', selector: '.upload-message'},
    {elementName: 'uploadMessageCont', selector: '.upload-message-container'}
  ];

  var uploadElements = window.util.queryElements(elementsData, uploadFormElement);

  var showPreviewImg = function (file) {
    if (file.type.match(/image.*/)) {
      var reader = new FileReader();
      reader.addEventListener('load', function (evt) {
        uploadElements.image.src = evt.target.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onUploadOverlayEscPress = function (evt) {
    if (window.util.isEscEvent(evt) && evt.target !== uploadElements.description) {
      closeUploadOverlay();
    }
  };

  var clearUploadErrors = function () {
    uploadErrorElement.classList.add('hidden');
    uploadErrorElement.textContent = '';
  };

  var openUploadOverlay = function () {
    showPreviewImg(uploadElements.uploadFile.files[0]);
    uploadElements.overlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
  };

  var closeUploadOverlay = function () {
    uploadElements.overlay.classList.add('hidden');
    uploadElements.uploadFile.value = '';
    uploadElements.hashtags.value = '';
    uploadElements.description.value = '';
    window.validate.clearHashtagsError();
    window.effect.setDefault();
    window.effect.setDefaultLevel();
    window.scale.setDefault();
    clearUploadErrors();
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  uploadElements.uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  uploadElements.formCancel.addEventListener('click', function () {
    closeUploadOverlay();
  });

  var onSuccess = function () {
    closeUploadOverlay();
    uploadElements.uploadMessageCont.textContent = 'Фотография успешно загружена';
    uploadElements.uploadMessage.classList.remove('hidden');
    setTimeout(function () {
      uploadElements.uploadMessage.classList.add('hidden');
    }, MESSAGE_TIME);
  };

  var onError = function (errorMessage) {
    uploadErrorElement.classList.remove('hidden');
    uploadErrorElement.textContent = errorMessage;
    setTimeout(function () {
      clearUploadErrors();
    }, MESSAGE_TIME);
  };

  var onUploadSubmitClick = function (evt) {
    evt.preventDefault();
    if (window.validate.validateHashtags()) {
      window.backend.upload(new FormData(uploadFormElement), onSuccess, onError);
    }
  };

  uploadFormElement.addEventListener('submit', onUploadSubmitClick);
})();
