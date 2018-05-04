'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var AREA = ['Acad Concourse', 'Lecture Theater', 'Lift 17-18', 'Lift 19', 'Lift 25-26', 'Lift 27-28', 'Lift 29-30', 'Lift 31-32', 'CYT Bldg', 'LSK Bldg', 'TBA', 'Other'];

function groupBy(list, iteratee) {
  var result = {};
  list.forEach(function (item) {
    var key = iteratee(item);
    result[key] = result[key] || [];
    result[key].push(item);
  });
  return result;
}

function time2Timeslot(hour, minute) {
  return (minute > 15 && minute < 30 ? 1 : 0) + (minute > 45 ? 1 : 0) + (hour - 8) * 2 + (minute > 15 ? minute > 45 ? 2 : 1 : 0);
}

function timeslot2Time(timeslot) {
  var hour = parseInt(timeslot / 2 + 8);
  var minute = timeslot % 2 ? 30 : 0;
  return { hour: hour, minute: minute };
}

function formattedTime(weekDay, hour, minute) {
  var minuteText = minute >= 30 ? '30' : '00';
  var hourText = digitPad(hour);
  var weekDayText = '日一二三四五六'[weekDay];

  return '\u661F\u671F' + weekDayText + ' ' + hourText + ':' + minuteText;
}

function digitPad(num) {
  return num.toString().padStart(2, '0');
}

function getSearchDateTimes() {
  var now = new Date();
  var date = {
    weekDay: now.getDay(),
    hour: now.getHours(),
    minute: now.getMinutes()
  };

  var queryString = window.location.search.substring(1);

  queryString.split('&').forEach(function (item) {
    var _item$split = item.split('='),
        _item$split2 = _slicedToArray(_item$split, 2),
        key = _item$split2[0],
        value = _item$split2[1];

    if (key.match(/^(weekDay|hour|minute)$/)) {
      date[key] = parseInt(value);
    }
  });

  return date;
}

function updateList(weekDay, hour, minute) {
  var timeSlot = time2Timeslot(hour, minute);
  if (timeSlot > 0) {
    fetch('./' + weekDay + '/' + timeSlot + '.json').then(function (res) {
      return res.json();
    }).then(function (json) {
      if (json.length > 0) {
        return groupBy(json, function (item) {
          return AREA.find(function (place) {
            return item.room.match(place);
          }) || 'Other';
        });
      } else {
        throw 'There is no room to show';
      }
    }).then(function (roomGroup) {
      var main = document.getElementById('main');
      var h2 = document.createElement('h2');
      main.textContent = '';
      h2.textContent = formattedTime(weekDay, hour, minute) + ' \u6709\u54A9\u623F';
      main.appendChild(h2);
      AREA.forEach(function (key) {
        if (key === 'TBA') return;
        if (!roomGroup.hasOwnProperty(key) && key !== 'Other') return;

        var group = roomGroup[key].sort(function (a, b) {
          return b.until - a.until;
        });

        var dl = document.createElement('dl');
        var dt = document.createElement('dt');
        dt.textContent = key;
        dl.appendChild(dt);

        group.forEach(function (room) {
          var time = timeslot2Time(room.until);
          var dd = document.createElement('dd');
          dd.innerHTML = '<u>' + room.room + '</u> probably empty until <strong>' + digitPad(time.hour) + ':' + digitPad(time.minute) + '</strong>';
          dl.appendChild(dd);
        });

        main.appendChild(dl);
      });
    }).catch(function (errorMsg) {
      var main = document.getElementById('main');
      main.textContent = errorMsg;
    });
  } else {
    var main = document.getElementById('main');
    main.textContent = 'Come back later between 8:00AM and 23:30PM';
  }
}

function setUp() {
  var _getSearchDateTimes = getSearchDateTimes(),
      weekDay = _getSearchDateTimes.weekDay,
      hour = _getSearchDateTimes.hour,
      minute = _getSearchDateTimes.minute;

  var weekDayOption = document.getElementById('weekDay').querySelector('option[value=\'' + weekDay + '\']');
  var minuteOption = document.getElementById('minute').querySelector('option[value=\'' + digitPad(minute < 30 ? 0 : 30) + '\']');
  var hourOption = document.getElementById('hour').querySelector('option[value=\'' + hour + '\']');
  weekDayOption.selected = true;
  minuteOption.selected = true;
  hourOption.selected = true;

  // Web Share
  if (navigator.share) {
    var webShareButton = document.getElementById('webShareButton');
    webShareButton.addEventListener('click', function () {
      // throttle?
      navigator.share({
        title: 'UST 爆房',
        text: '有房爆不爆？',
        url: window.location
      });
    });
    webShareButton.style.display = 'inline';
  }
  updateList(weekDay, hour, minute);
}

setUp();

//This is the service worker with the Cache-first network

//Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker
if (navigator.serviceWorker.controller) {
  console.log('[PWA Builder] active service worker found, no need to register');
} else {
  //Register the ServiceWorker
  navigator.serviceWorker.register('pwabuilder-sw.js', {
    scope: './'
  }).then(function (reg) {
    console.log('Service worker has been registered for scope:' + reg.scope);
  });
}

