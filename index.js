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

function msToTime(s) {
  //let seconds = (ms / 1000).toFixed(1);
  //let minutes = (ms / (1000 * 60)).toFixed(1);
  //let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  //let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  //return hours + minutes + seconds;
  //if (seconds < 60) return seconds + " Sec";
  //else if (minutes < 60) return minutes + " Min";
  //else if (hours < 24) return hours + " Hrs";
  //else return days + " Days"
  if (s > 0) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs
  } else {
    return "00:00:00"
  }
}

// getDay() returns the day of the week for the specified date according to local time, where 0 represents Sunday.
function getTimeDiff(day, time) {
  let dt = new Date();
  while (dt.getDay() != day) {
    dt.setDate(dt.getDate() - day);
  }

  time == "am" ? dt.setHours(10, 0, 0) : dt.setHours(19, 0, 0)

  let difference = Date.parse(dt) - Date.now()
  return msToTime(difference);
}

function displayClock(){
  let display = getTimeDiff(0, "am");
  document.getElementById('timer').innerHTML = display;
  setTimeout(displayClock, 1000);
}

window.onload = displayClock();

// TODO - select meeting day on view
// TODO - change colour when < 2mins?
