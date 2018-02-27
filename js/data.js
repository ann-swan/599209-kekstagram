'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var PHOTOS_COUNT = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 201;

  var createPhotosList = function (photosCount) {
    var photosList = [];
    for (var i = 1; i <= photosCount; i++) {
      photosList.push({
        url: 'photos/' + i + '.jpg',
        likes: window.util.getRandomBetween(MIN_LIKES, MAX_LIKES),
        comments: [window.util.getRandomArrayElement(COMMENTS)]
      });
    }
    return photosList;
  };

  window.data = createPhotosList(PHOTOS_COUNT);
})();
