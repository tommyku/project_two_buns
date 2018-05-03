const AREA = ['Acad Concourse', 'Lecture Theater', 'Lift 17-18', 'Lift 19', 'Lift 25-26', 'Lift 27-28', 'Lift 29-30', 'Lift 31-32', 'CYT Bldg', 'LSK Bldg', 'TBA', 'Other'];

function groupBy(list, iteratee) {
  const result = {};
  list.forEach((item) => {
    const key = iteratee(item);
    result[key] = result[key] || [];
    result[key].push(item);
  });
  return result;
}

function time2Timeslot(hour, minute) {
  return (minute > 15 && minute < 30 ? 1 : 0) + (minute > 45 ? 1 : 0) + (hour - 8) * 2 + ((minute > 15) ? ((minute > 45) ? 2 : 1) : 0);
}

function timeslot2Time(timeslot) {
  const hour = parseInt(timeslot / 2 + 8);
  const minute = (timeslot % 2) ? 30 : 0;
  return { hour, minute };
}

function digitPad(num) {
  return num.toString().padStart(2, '0');
}

const now = new Date();
const weekDay = now.getDay();
const hour = now.getHours();
const minute = now.getMinutes();
const timeSlot = time2Timeslot(hour, minute);

if (timeSlot > 0) {
  fetch(`./${weekDay}/${timeSlot}.json`)
    .then((res) => res.json())
    .then((json) => {
      return groupBy(json, (item) => {
        return AREA.find((place) => item.room.match(place)) || 'Other';
      });
    })
    .then((roomGroup) => {
      const main = document.getElementById('main');
      AREA.forEach((key) => {
        if (key === 'TBA') return;
        if (!roomGroup.hasOwnProperty(key) && key !== 'Other') return;

        const group = roomGroup[key].sort((a, b) => b.until - a.until);

        const dl = document.createElement('dl');
        const dt = document.createElement('dt');
        dt.textContent = key;
        dl.appendChild(dt);

        group.forEach((room) => {
          const time = timeslot2Time(room.until);
          const dd = document.createElement('dd');
          dd.innerHTML = `<u>${room.room}</u> probably empty until <strong>${digitPad(time.hour)}:${digitPad(time.minute)}</strong>`;
          dl.appendChild(dd);
        });

        main.appendChild(dl);
      });
    });
} else {
  const main = document.getElementById('main');
  main.textContent = 'Come back later between 8:00AM and 23:30PM';
}

//This is the service worker with the Cache-first network

//Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker
if (navigator.serviceWorker.controller) {
  console.log('[PWA Builder] active service worker found, no need to register')
} else {
  //Register the ServiceWorker
  navigator.serviceWorker.register('pwabuilder-sw.js', {
    scope: './'
  }).then(function(reg) {
    console.log('Service worker has been registered for scope:'+ reg.scope);
  });
}
