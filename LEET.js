function timeConversion(s) {
  var time = s.split(":");
  var hours = Number(time[0]);
  var minutes = time[1];
  var seconds = time[2].slice(0, 2);
  var amPm = time[2].slice(2, 4);

  if ((amPm === "PM" && hours < 12) || (amPm === "AM" && hours === 12)) {
    hours += 12;
  }
  console.log(hours + ":" + minutes + ":" + seconds);
}

timeConversion("12:01:01PM");
