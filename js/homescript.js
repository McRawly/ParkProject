var timeOfDay = ["Good Morning", "Good Afternoon", "Good Evening", "Good Night"]

// document.getElementById('time').innerHTML = new Date().getHours() >= 12 ? timeOfDay[1] : timeOfDay[0];
if (new Date().getHours() > 0 && new Date().getHours() < 12) {
  document.getElementById('time').innerHTML = timeOfDay[0]
} else if (new Date().getHours() >=12 && new Date().getHours() < 17) {
  document.getElementById('time').innerHTML = timeOfDay[1]
} else if (new Date().getHours() >=17 && new Date().getHours() <= 21) {
  document.getElementById('time').innerHTML = timeOfDay[2]
} else {
  document.getElementById('time').innerHTML = timeOfDay[3]
}

function increaseFontSize() {
  var buttonPush = document.getElementById('hover');
  style = window.getComputedStyle(buttonPush, null).getPropertyValue('font-size');
  currentSize = parseFloat(style);
  buttonPush.style.fontSize = (currentSize + 5) + 'px';
}

function decreaseFontSize() {
  var buttonPush = document.getElementById('hover');
  style = window.getComputedStyle(buttonPush, null).getPropertyValue('font-size');
  currentSize = parseFloat(style);
  buttonPush.style.fontSize = (currentSize - 5) + 'px';
}