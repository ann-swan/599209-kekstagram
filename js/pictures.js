'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTOS_COUNT = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var DEFAULT_EFFECT = 'none';
var DEFAULT_SLIDER_RANGE = 100;
var PREFIX_FOR_CLASS_EFFECT = 'effect-';
var SCALE_RANGE = 25;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var DEFAULT_SCALE = 100;
var MAX_HASHTAG_LENGTH = 20;
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');
var galleryOverlayElement = document.querySelector('.gallery-overlay');
var galleryOverlayCloseElement = galleryOverlayElement.querySelector('.gallery-overlay-close');
var uploadFormElement = document.querySelector('.upload-form');
var uploadFileElement = uploadFormElement.querySelector('#upload-file');
var uploadOverlayElement = uploadFormElement.querySelector('.upload-overlay');
var uploadOverlayCancelElement = uploadFormElement.querySelector('.upload-form-cancel');
var uploadSubmitElement = uploadFormElement.querySelector('.upload-form-submit');
var uploadEffectLevelElement = uploadFormElement.querySelector('.upload-effect-level');
var uploadEffectLevelPinElement = uploadEffectLevelElement.querySelector('.upload-effect-level-pin');
var uploadEffectLevelLineElement = uploadEffectLevelElement.querySelector('.upload-effect-level-line');
var uploadEffectLevelValue = uploadEffectLevelElement.querySelector('.upload-effect-level-value');
var uploadEffectLevelValElement = uploadEffectLevelElement.querySelector('.upload-effect-level-val');
var uploadEffectElement = uploadFormElement.querySelector('.upload-effect-controls');
var effectImageElement = uploadFormElement.querySelector('.effect-image-preview');
var formDescroptionElement = uploadFormElement.querySelector('.upload-form-description');
var scaleValueElement = uploadFormElement.querySelector('.upload-resize-controls-value');
var scaleBtnDecElement = uploadFormElement.querySelector('.upload-resize-controls-button-dec');
var scaleBtnIncElement = uploadFormElement.querySelector('.upload-resize-controls-button-inc');
var hashtagsElement = uploadFormElement.querySelector('.upload-form-hashtags');
var hashtagsErrorElement = uploadFormElement.querySelector('.upload-form-hashtags-error');
var effects = {
  chrome: function () {
    return 'grayscale(' + getEffectLevelValue() / 100 + ')';
  },
  sepia: function () {
    return 'sepia(' + getEffectLevelValue() / 100 + ')';
  },
  marvin: function () {
    return 'invert(' + getEffectLevelValue() + '%)';
  },
  phobos: function () {
    return 'blur(' + 3 * getEffectLevelValue() / 100 + 'px)';
  },
  heat: function () {
    return 'brightness(' + 3 * getEffectLevelValue() / 100 + ')';
  },
  none: function () {
    return '';
  },
};
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

var fillGalleryElement = function (photo) {
  galleryOverlayElement.querySelector('.gallery-overlay-image').attributes.src.value = photo.url;
  galleryOverlayElement.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlayElement.querySelector('.comments-count').textContent = photo.comments.length;
};

photos = createPhotosList(PHOTOS_COUNT);
fillPhotosList(photos, picturesElement);

var onGalleryOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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
      fillGalleryElement(photos[target.attributes.id]);
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
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGalleryOverlay();
  }
});

var calculateEffectLevel = function () {
  return Math.round(uploadEffectLevelPinElement.offsetLeft / uploadEffectLevelLineElement.offsetWidth * 100);
};

var getCurrentEffect = function () {
  return effectImageElement.dataset.effect;
};

var setSliderVisibility = function () {
  if (getCurrentEffect() === DEFAULT_EFFECT) {
    uploadEffectLevelElement.classList.add('hidden');
    return;
  }
  uploadEffectLevelElement.classList.remove('hidden');
};

var setCurrentEffect = function (effectName) {
  effectImageElement.classList.remove(PREFIX_FOR_CLASS_EFFECT + getCurrentEffect());
  effectImageElement.classList.add(PREFIX_FOR_CLASS_EFFECT + effectName);
  effectImageElement.dataset.effect = effectName;
  setSliderVisibility();
};

var setEffectLevelValue = function (levelValue) {
  uploadEffectLevelValue.value = levelValue;
};

var getEffectLevelValue = function () {
  return uploadEffectLevelValue.value;
};

var setFilter = function () {
  effectImageElement.style.filter = effects[getCurrentEffect()]();
};

var setSliderPinPosition = function (levelProc) {
  uploadEffectLevelValElement.style.width = levelProc + '%';
  uploadEffectLevelPinElement.style.left = levelProc + '%';
};

var setEffectLevel = function (level) {
  setEffectLevelValue(level);
  setSliderPinPosition(level);
  setFilter();
};

var onEffectLevelPinMouseUp = function () {
  setEffectLevel(calculateEffectLevel());
};

var onEffectClick = function (evt) {
  var newEffectName = evt.target.value;
  if (newEffectName && newEffectName !== getCurrentEffect()) {
    setCurrentEffect(newEffectName);
    setEffectLevel(DEFAULT_SLIDER_RANGE);
  }
};

uploadEffectLevelPinElement.addEventListener('mouseup', onEffectLevelPinMouseUp);
uploadEffectElement.addEventListener('click', onEffectClick);

var getScaleValue = function () {
  return Number(scaleValueElement.value.slice(0, -1));
};

var setScaleValue = function (scaleValue) {
  scaleValueElement.value = scaleValue + '%';
  effectImageElement.style.transform = 'scale(' + scaleValue / 100 + ')';
};

var onScaleBtnDecClick = function () {
  var scale = getScaleValue();
  if (scale > MIN_SCALE) {
    setScaleValue(scale - SCALE_RANGE);
  }
};

var onScaleBtnIncClick = function () {
  var scale = getScaleValue();
  if (scale < MAX_SCALE) {
    setScaleValue(scale + SCALE_RANGE);
  }
};

scaleBtnDecElement.addEventListener('click', onScaleBtnDecClick);
scaleBtnIncElement.addEventListener('click', onScaleBtnIncClick);

var setCustomValidity = function (errorText) {
  hashtagsElement.style.border = '1px red solid';
  hashtagsErrorElement.textContent = errorText;
};

var clearHashtagsError = function () {
  hashtagsElement.style.border = '';
  hashtagsErrorElement.textContent = '';
};

var validateHashtags = function () {
  var hashtags = hashtagsElement.value.trim();
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
      if (hashtags[i][0] !== '#') {
        setCustomValidity('Хэш-тег должен начинается с символа # (решётка)');
        return false;
      }
      if (hashtags[i].length < 2) {
        setCustomValidity('Хэш-тег не может содержать только символ # (решётка)');
        return false;
      }
      if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
        setCustomValidity('Длина хэш-тега не может превышать 20 символов');
        return false;
      }
      if (hashtags[i].substring(1).search('#') !== -1) {
        setCustomValidity('Хэш-тег не должен содержать несколько символов # (решётка)');
        return false;
      }
      if (hashtags.includes(hashtags[i], i + 1)) {
        setCustomValidity('Хэш-теги не могут повторяться');
        return false;
      }
    }
  }
  clearHashtagsError();
  return true;
};

var onHashtagsKeyup = function () {
  validateHashtags();
};

hashtagsElement.addEventListener('keyup', onHashtagsKeyup);

var onUploadSubmitClick = function (evt) {
  evt.preventDefault();
  if (validateHashtags()) {
    uploadFormElement.submit();
  }
};

uploadSubmitElement.addEventListener('click', onUploadSubmitClick);

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
  if (evt.keyCode === ESC_KEYCODE && evt.target !== formDescroptionElement) {
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
  clearHashtagsError();
  setCurrentEffect(DEFAULT_EFFECT);
  setEffectLevel(DEFAULT_SLIDER_RANGE);
  setScaleValue(DEFAULT_SCALE);
  document.removeEventListener('keydown', onUploadOverlayEscPress);
};

uploadFileElement.addEventListener('change', function () {
  openUploadOverlay();
});

uploadOverlayCancelElement.addEventListener('click', function () {
  closeUploadOverlay();
});
