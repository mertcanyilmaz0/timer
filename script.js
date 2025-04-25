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

window.onload = function () {
  requestNotificationPermission();
};

let destroyPoint = 1
function destroyed() {
  const minutes = parseInt(document.getElementById("minuteInput").value);
  const container = document.getElementById("container")
  const timer = document.getElementById("timer")
  const exit = document.getElementById("exit")
  const work = document.getElementById("work")
  const settings = document.getElementById("settings")
  if (isNaN(minutes) || minutes <= 0) {
    alert("Lütfen geçerli bir dakika değeri girin.");
    return;
  } else {
    if (destroyPoint === 0) {
      container.style.display = "none";
      //timer.style.display = "flex"
      timer.style.justifyContent = "center";
      settings.style.display = "none"
      timer.style.alignItems = "center";
      work.style.height = "calc(100vh - 4rem)";
      timer.style.marginTop = "0rem";
      exit.style.display = "block";
    } if (destroyPoint === 1) {
      {
        container.style.display = "block";
        settings.style.display = "block"
        work.style.height = "";
        exit.style.display = "none";
        endTimer()
      }
    }
  }
};
document.querySelector("#timer").addEventListener("click", function () {
  if (destroyPoint === 0) {
    console.log("0");
    destroyPoint = 1;
    destroyed()
  }
})
document.querySelector("#btn").addEventListener("click", function () {
  startTimer()
  if (destroyPoint === 1) {
    destroyPoint = 0;
    destroyed()
    console.log("1");
    console.log("destroypoint" + " " + destroyPoint);
  }
});
const input = document.getElementById('bgInput');
const customBtn = document.getElementById('customBtn');

customBtn.addEventListener('click', () => {
  input.click(); // Tıklanınca gizli input'u tetikleme
});

input.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const navbar = document.getElementById("navbar");

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.body.style.backgroundImage = `url('${e.target.result}')`;
      navbar.style.backgroundImage = `url('${e.target.result}')`
    };

    reader.readAsDataURL(file);
  } else {
    alert("Lütfen bir resim dosyası seçin.");
  }
});

const soz = document.getElementById("ozluSoz");

soz.addEventListener("change", function(){
  if (soz.checked) {
    const text = document.getElementById("motivation");
    console.log("Kutu işaretli.");
    text.style.display = "inline"
  } else {
    const text = document.getElementById("motivation");
    console.log("Kutu işaretli değil.");
    text.style.display = "none";
  };
});

let navbarPoint = 1;
const carp = document.getElementById("carpi");
const settings = document.getElementById("settings");
console.log("navbar point 1");
settings.addEventListener("click", function(){
if(navbarPoint === 1){
  const navbar = document.getElementById("navbar");
  navbar.style.display = "block"
  navbar.style.position = "fixed"
  navbar.style.left = "0"
  navbar.style.top = "0"
  navbarPoint = 0
  console.log("navbar point 0");
};
});
carp.addEventListener("click", function(){
  if(navbarPoint === 0){
      const navbar = document.getElementById("navbar");
      navbar.style.display = "none"
      navbar.style.position = ""
      navbar.style.left = ""
      navbar.style.top = ""
      navbarPoint = 1
      console.log("navbar point 1");
  }
})