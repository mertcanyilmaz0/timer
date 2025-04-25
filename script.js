let countdown;

function requestNotificationPermission() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}
function endTimer() {
  clearInterval(countdown);
  document.getElementById("timer").textContent = "00:00";
  console.log("Zamanlayıcı durduruldu");
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

let destroyPoint = 1
function destroyed(){
  const minutes = parseInt(document.getElementById("minuteInput").value);
  const container = document.getElementById("container")
  const timer = document.getElementById("timer")
  const exit = document.querySelector("#exit")
  if (isNaN(minutes) || minutes <= 0){
    alert("Lütfen geçerli bir dakika değeri girin.");
    return;
  } else {
    if (destroyPoint === 0){
      container.style.display = "none";
      timer.style.display = "flex"
      timer.style.justifyContent = "center";
      timer.style.alignItems = "center"; 
      timer.style.height = "calc(100vh - 10rem)";
      timer.style.marginTop = "0rem";
      exit.style.display = "block";
    } if (destroyPoint === 1){{
        container.style.display = "block";
        timer.style.height = "";
        exit.style.display = "none";
        endTimer()
    }
  }
  }};
document.querySelector("#timer").addEventListener("click", function(){
  if (destroyPoint === 0){
    console.log("0");
    destroyPoint = 1;
    destroyed()
  }
})
document.querySelector("#btn").addEventListener("click", function(){
  startTimer()
  if (destroyPoint === 1){
    destroyPoint = 0;
    destroyed()
    console.log("1");
    console.log("destroypoint" + " " + destroyPoint);
  }
});