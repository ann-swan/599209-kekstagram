'use strict';

(function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var PHOTOS_COUNT = 25;
  var photos = [];

  var createPhotosList = function (photosCount) {
    var photosList = [];
    for (var i = 1; i <= photosCount; i++) {
      photosList.push({
        url: 'photos/' + i + '.jpg',
        likes: getRandomBetween(15, 201),
        comments: [getRandomArrayElement(COMMENTS)]
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

  window.data = createPhotosList(PHOTOS_COUNT);
})();
