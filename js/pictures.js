'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTOS_COUNT = 25;
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var pictiresElement = document.querySelector('.pictures');
var galleryOverlayElement = document.querySelector('.gallery-overlay');
var photos = [];

var createPhotosList = function (photosCount) {
  var photosList = [];
  for (var i = 1; i <= photosCount; i++) {
    var commentsList = [];
    commentsList.push(getRandomArrayElement(COMMENTS));
    photosList.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomBetween(15, 201),
      comments: commentsList
    });
  }
  return photosList;
};

var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (list) {
  return list[getRandomBetween(0, list.length)];
};

var createPhotoElement = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').attributes.src.value = photo.url;
  pictureElement.querySelector('.picture-likes').textContent = photo.likes;
  pictureElement.querySelector('.picture-comments').textContent = photo.comments.length;
  return pictureElement;
};

var fillPhotosListElement = function (list, listElement) {
  var fragment = document.createDocumentFragment();
  list.forEach(function (item, i) {
    fragment.appendChild(createPhotoElement(list[i]));
  });
  listElement.innerHTML = '';
  listElement.appendChild(fragment);
};

var fillGalleryElement = function (photo) {
  galleryOverlayElement.querySelector('.gallery-overlay-image').attributes.src.value = photo.url;
  galleryOverlayElement.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlayElement.querySelector('.comments-count').textContent = photo.comments.length;
};

photos = createPhotosList(PHOTOS_COUNT);
fillPhotosListElement(photos, pictiresElement);

galleryOverlayElement.classList.remove('hidden');
fillGalleryElement(photos[0]);
