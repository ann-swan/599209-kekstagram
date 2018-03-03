'use strict';

(function () {
  var elementsData = [
    {elementName: 'pictures', selector: '.pictures'},
    {elementName: 'overlay', selector: '.gallery-overlay'},
    {elementName: 'overlayClose', selector: '.gallery-overlay-close'}
  ];

  var picturesElement = window.util.queryElements(elementsData, document);

  var fillGalleryElement = function (photo) {
    picturesElement.overlay.querySelector('.gallery-overlay-image').attributes.src.value = photo.url;
    picturesElement.overlay.querySelector('.likes-count').textContent = photo.likes;
    picturesElement.overlay.querySelector('.comments-count').textContent = photo.comments.length;
  };

  var onGalleryOverlayEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeGalleryOverlay();
    }
  };

  var openGalleryOverlay = function () {
    picturesElement.overlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayEscPress);
  };

  var closeGalleryOverlay = function () {
    picturesElement.overlay.classList.add('hidden');
    document.removeEventListener('keydown', onGalleryOverlayEscPress);
  };

  var onPicturesClick = function (evt) {
    var target = evt.target;
    evt.preventDefault();
    while (target !== picturesElement.pictures) {
      if (target.className === 'picture') {
        fillGalleryElement(window.picture.data[target.attributes.id]);
        openGalleryOverlay();
        return;
      }
      target = target.parentNode;
    }
  };

  picturesElement.pictures.addEventListener('click', onPicturesClick);

  picturesElement.overlayClose.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  picturesElement.overlayClose.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      closeGalleryOverlay();
    }
  });
})();
