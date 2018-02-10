'use strict';

var AREA = ['Acad Concourse', 'CYT Bldg', 'LSK Bldg', 'Lecture Theater', 'Lift 17-18', 'Lift 19', 'Lift 25-26', 'Lift 27-28', 'Lift 29-30', 'Lift 31-32', 'TBA'];

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
  return (hour - 8) * 2 + (minute > 15 ? minute > 45 ? 2 : 1 : 0);
}

function timeslot2Time(timeslot) {
  var hour = parseInt(timeslot / 2 + 8);
  var minute = timeslot % 2 ? 30 : 0;
  return { hour: hour, minute: minute };
}

var now = new Date();
var weekDay = now.getDay();
var hour = now.getHours();
var minute = now.getMinutes();
var timeSlot = time2Timeslot(hour, minute);

fetch('./' + weekDay + '/' + timeSlot + '.json').then(function (res) {
  return res.json();
}).then(function (json) {
  return groupBy(json, function (item) {
    return AREA.find(function (place) {
      return item.room.match(place);
    }) || 'Other';
  });
}).then(function (roomGroup) {
  var main = document.getElementById('main');
  Object.keys(roomGroup).forEach(function (key) {
    if (key === 'TBA') return;

    var group = roomGroup[key].sort(function (a, b) {
      return a - b;
    });

    var dl = document.createElement('dl');
    var dt = document.createElement('dt');
    dt.textContent = key;
    dl.appendChild(dt);

    group.forEach(function (room) {
      var time = timeslot2Time(room.until);
      var dd = document.createElement('dd');
      dd.innerHTML = '<u>' + room.room + '</u> probably empty until <strong>' + time.hour + ':' + time.minute + '</strong>';
      dl.appendChild(dd);
    });

    main.appendChild(dl);
  });
});

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

