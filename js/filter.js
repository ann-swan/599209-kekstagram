'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
  var elementsData = [
    {elementName: 'container', selector: '.filters'},
    {elementName: 'filter', selector: '.filters-radio'},
    {elementName: 'filterItem', selector: '.filters-item'}
  ];
  var recommendData = [];
  var filterElements = window.util.queryElements(elementsData, document);

  var setRecommendData = function (data) {
    recommendData = data.slice(0);
  };

  var shuffle = function (list) {
    var newList = [];
    var listClone = list.slice(0);
    list.forEach(function () {
      newList.push(listClone.splice(window.util.getRandomBetween(0, listClone.length - 1), 1)[0]);
    });
    return newList;
  };

  var filteredData = {
    'recommend': function () {
      return recommendData;
    },
    'popular': function () {
      return filterDesc(recommendData, 'likes');
    },
    'discussed': function () {
      return filterDesc(recommendData, 'comments');
    },
    'random': function () {
      return shuffle(recommendData);
    }
  };

  var getNumber = function (data) {
    return Array.isArray(data) ? data.length : data;
  };

  var compareData = function (first, second) {
    if (first > second) {
      return -1;
    } else if (first < second) {
      return 1;
    }
    return 0;
  };

  var filterDesc = function (data, property) {
    return data.slice(0).sort(function (firstData, secondData) {
      var first = getNumber(firstData[property]);
      var second = getNumber(secondData[property]);
      return compareData(first, second);
    });
  };

  var showFilters = function () {
    filterElements.container.classList.remove('filters-inactive');
  };

  var onFilterChange = window.debounce(function (evt) {
    window.picture.data = filteredData[evt.target.value]();
    window.picture.fillPhotosList(window.picture.data, window.picture.element);
  }, DEBOUNCE_TIME, filterElements.container);

  filterElements.container.addEventListener('change', onFilterChange);

  filterElements.container.addEventListener('keydown', function (evt) {
    window.util.imitateClick(evt);
  });

  window.filter = {
    show: showFilters,
    setRecommendData: setRecommendData
  };

})();
