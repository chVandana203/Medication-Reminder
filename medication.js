let alarms = [];

function setAlarm() {
  const timeInput = document.getElementById("alarm-time");
  const photoInput = document.getElementById("photo-upload");

  const time = timeInput.value;
  if (!time) {
    alert("Please select a time.");
    return;
  }

  if (photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;
      const alarm = {
        time: time,
        image: imageData
      };
      alarms.push(alarm);
      displayAlarms();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    const alarm = {
      time: time,
      image: null
    };
    alarms.push(alarm);
    displayAlarms();
  }
}

function displayAlarms() {
  const list = document.getElementById("alarm-list");
  list.innerHTML = "";

  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");

    const alarmText = document.createElement("span");
    alarmText.innerHTML = `Alarm set for <strong>${alarm.time}</strong>`;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = function () {
      alarms.splice(index, 1);
      displayAlarms();
    };

    li.appendChild(alarmText);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function checkAlarms() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  alarms.forEach((alarm, index) => {
    if (alarm.time === currentTime) {
      showAlarmPopup(alarm);
      document.getElementById("alarm-sound").play();
      alarms.splice(index, 1);
      displayAlarms();
    }
  });
}

function showAlarmPopup(alarm) {
  const popup = document.getElementById("popup");
  const image = document.getElementById("popup-image");
  const time = document.getElementById("popup-time");
  const msg = document.getElementById("no-photo-msg");

  time.innerText = `It's ${alarm.time}!`;

  if (alarm.image) {
    image.src = alarm.image;
    image.style.display = "block";
    msg.style.display = "none";
  } else {
    image.style.display = "none";
    msg.innerText = "No photo uploaded.";
    msg.style.display = "block";
  }

  popup.style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

setInterval(checkAlarms, 1000);
window.onload = displayAlarms;
