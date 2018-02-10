const AREA = ['Acad Concourse', 'CYT Bldg', 'LSK Bldg', 'Lecture Theater', 'Lift 17-18', 'Lift 19', 'Lift 25-26', 'Lift 27-28', 'Lift 29-30', 'Lift 31-32', 'TBA']

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
  return (hour - 8) * 2 + ((minute > 15) ? ((minute > 45) ? 2 : 1) : 0);
}

function timeslot2Time(timeslot) {
  const hour = parseInt(timeslot / 2 + 8);
  const minute = (timeslot % 2) ? 30 : 0;
  return { hour, minute };
}

const now = new Date();
const weekDay = now.getDay();
const hour = now.getHours();
const minute = now.getMinutes();
const timeSlot = time2Timeslot(hour, minute);

fetch(`./${weekDay}/${timeSlot}.json`)
  .then((res) => res.json())
  .then((json) => {
    return groupBy(json, (item) => {
      return AREA.find((place) => item.room.match(place)) || 'Other';
    });
  })
  .then((roomGroup) => {
    const main = document.getElementById('main');
    Object.keys(roomGroup).forEach((key) => {
      if (key === 'TBA') return;

      const group = roomGroup[key].sort((a, b) => a - b);

      const dl = document.createElement('dl');
      const dt = document.createElement('dt');
      dt.textContent = key;
      dl.appendChild(dt);

      group.forEach((room) => {
        const time = timeslot2Time(room.until);
        const dd = document.createElement('dd');
        dd.innerHTML = `<u>${room.room}</u> probably empty until <strong>${time.hour}:${time.minute}</strong>`;
        dl.appendChild(dd);
      });

      main.appendChild(dl);
    });
  });

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
