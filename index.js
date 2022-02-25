const today = new Date().getDay()

function toggleFullscreen(event) {
  let element = document.body;

  if (event instanceof HTMLElement) {
    element = event;
  }

  let isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

  element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function() {
    return false;
  };
  document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function() {
    return false;
  };

  isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

function formatNums(n) {
  return n < 10 ? `0${n}` : n
}

function msToTime(s) {
  if (s > 0) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;

    if (hrs > 0) {
      return `${formatNums(hrs)} : ${formatNums(mins)} : ${formatNums(secs)}`
    } else {
      return `${formatNums(mins)} : ${formatNums(secs)}`
    }
  } else {
    return "00:00"
  }
}

// getDay() returns the day of the week for the specified date according to local time (Sun == 0, Mon == 1...)
function getTimeDiff(day, time) {
  let dt = new Date();
  while (dt.getDay() != day) {
    dt.setDate(dt.getDate() - day);
  }

  time == "am" ? dt.setHours(10, 0, 0) : dt.setHours(19, 0, 0)

  let difference = Date.parse(dt) - Date.now()
  return difference;
}

function displayClock(){
  let display = null
  today == 0 ? display = getTimeDiff(today, "am") : display = getTimeDiff(today, "pm");
  document.getElementById('timer').innerHTML = msToTime(display);
  if (display < 120000) {
    document.getElementById('timer').style.color = 'red'
  }
  setTimeout(displayClock, 1000);
}

window.onload = displayClock();

