'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  var createPhotoElement = function (index, photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.attributes.id = index;
    pictureElement.querySelector('img').attributes.src.value = photo.url;
    pictureElement.querySelector('.picture-likes').textContent = photo.likes;
    pictureElement.querySelector('.picture-comments').textContent = photo.comments.length;
    return pictureElement;
  };

  var fillPhotosList = function (list, listElement) {
    var fragment = document.createDocumentFragment();
    list.forEach(function (item, i) {
      fragment.appendChild(createPhotoElement(i, item));
    });
    listElement.innerHTML = '';
    listElement.appendChild(fragment);
  };

  fillPhotosList(window.data, picturesElement);
})();
