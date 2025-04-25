let countdown;

function requestNotificationPermission() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

function startTimer() {
  clearInterval(countdown); 

  const minutes = parseInt(document.getElementById("minuteInput").value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Lütfen geçerli bir dakika değeri girin.");
    return;
  }

  let totalSeconds = minutes * 60;

  countdown = setInterval(() => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    document.getElementById("timer").textContent =
      `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

    if (totalSeconds <= 0) {
      clearInterval(countdown);
      sendNotification(); 
    }

    totalSeconds--;
  }, 1000);
}

function sendNotification() {
  if (Notification.permission === "granted") {
    new Notification("Süre doldu!", {
      body: "Zamanlayıcınız tamamlandı.",
      icon: "https://example.com/icon.png"
    });
  }
}

window.onload = function() {
  requestNotificationPermission();
};