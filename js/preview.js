'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var galleryOverlayElement = document.querySelector('.gallery-overlay');
  var galleryOverlayCloseElement = galleryOverlayElement.querySelector('.gallery-overlay-close');

  var fillGalleryElement = function (photo) {
    galleryOverlayElement.querySelector('.gallery-overlay-image').attributes.src.value = photo.url;
    galleryOverlayElement.querySelector('.likes-count').textContent = photo.likes;
    galleryOverlayElement.querySelector('.comments-count').textContent = photo.comments.length;
  };

  var onGalleryOverlayEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeGalleryOverlay();
    }
  };

  var openGalleryOverlay = function () {
    galleryOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayEscPress);
  };

  var closeGalleryOverlay = function () {
    galleryOverlayElement.classList.add('hidden');
    document.removeEventListener('keydown', onGalleryOverlayEscPress);
  };

  var onPicturesClick = function (evt) {
    var target = evt.target;
    evt.preventDefault();
    while (target !== picturesElement) {
      if (target.className === 'picture') {
        fillGalleryElement(window.data[target.attributes.id]);
        openGalleryOverlay();
        return;
      }
      target = target.parentNode;
    }
  };

  picturesElement.addEventListener('click', onPicturesClick);

  galleryOverlayCloseElement.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  galleryOverlayCloseElement.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      closeGalleryOverlay();
    }
  });
})();
