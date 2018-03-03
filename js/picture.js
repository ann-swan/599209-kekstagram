'use strict';

(function () {
  var pictureTemplateElement = document.querySelector('#picture-template').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');
  var picturesData = [];

  var createPhotoElement = function (index, photo) {
    var pictureElement = pictureTemplateElement.cloneNode(true);
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

  var onSuccess = function (data) {
    window.util.clearLoadErrors();
    window.picture.data = data;
    window.filter.setRecommendData(data);
    fillPhotosList(data, picturesElement);
    window.filter.show();
  };

  var onError = function (errorMessage) {
    window.util.showLoadErrors(errorMessage);
  };

  window.backend.download(onSuccess, onError);

  window.picture = {
    fillPhotosList: fillPhotosList,
    element: picturesElement,
    data: picturesData
  };
})();
