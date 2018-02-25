'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
  var elementsData = [
    {elementName: 'container', selector: '.filters'},
    {elementName: 'filter', selector: '.filters-radio'},
    {elementName: 'filterItem', selector: '.filters-item'}
  ];
  var recommendData = window.data.slice(0);
  var filterElements = window.util.queryElements(elementsData, document);

  var setRecommendData = function (data) {
    recommendData = data;
  };

  var shuffle = function (list) {
    var newList = [];
    var copyedList = list.slice(0);
    list.forEach(function () {
      newList.push(copyedList.splice(window.util.getRandomBetween(0, copyedList.length - 1), 1)[0]);
    });
    return newList;
  };

  var filteredData = {
    'recommend': function () {
      return recommendData;
    },
    'popular': function () {
      return filterDesc(window.data, 'likes');
    },
    'discussed': function () {
      return filterDesc(window.data, 'comments');
    },
    'random': function () {
      return shuffle(window.data);
    }
  };

  var getNumber = function (data) {
    return Array.isArray(data) ? data.length : data;
  };

  var filterDesc = function (data, property) {
    return data.slice(0).sort(function (first, second) {
      first = getNumber(first[property]);
      second = getNumber(second[property]);
      if (first > second) {
        return -1;
      } else if (first < second) {
        return 1;
      }
      return 0;
    });
  };

  var showFilters = function () {
    filterElements.container.classList.remove('filters-inactive');
  };

  var onFilterChange = window.debounce(function (evt) {
    window.data = filteredData[evt.target.value]();
    window.picture.fillPhotosList(window.data, window.picture.element);
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
