
let countdown;
let isPaused = false;
let totalSeconds = 0;
function requestNotificationPermission() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
} 
function endTimer() {
  clearInterval(countdown);
  document.getElementById("timer").textContent = "00:00";
  document.getElementById("duraklat-btn").disabled = true;
  console.log("Zamanlayıcı durduruldu");
}

function startTimer() {
  clearInterval(countdown); // Önceki zamanlayıcı varsa durdur

  const minuteInput = document.getElementById("minuteInput");
  const minutes = parseInt(minuteInput.value);

  if (isNaN(minutes) || minutes <= 0) {
    alert("Lütfen geçerli bir dakika değeri girin.");
    return;
  }

  totalSeconds = minutes * 60;
  isPaused = false;

  document.getElementById("duraklat-btn").textContent = "Duraklat";
  document.getElementById("duraklat-btn").disabled = false;

  countdown = setInterval(() => {
    if (!isPaused) {
      const min = Math.floor(totalSeconds / 60);
      const sec = totalSeconds % 60;

      document.getElementById("timer").textContent =
        `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

      if (totalSeconds <= 0) {
        clearInterval(countdown);
        sendNotification();
        document.getElementById("duraklat-btn").disabled = true;
      }

      totalSeconds--;
    }
  }, 1000);
}

function togglePause() {
  if (totalSeconds <= 0) return;

  isPaused = !isPaused;
  const duraklatBtn = document.getElementById("duraklat-btn");
  duraklatBtn.textContent = isPaused ? "Devam Et" : "Duraklat";
  console.log(isPaused ? "Zamanlayıcı duraklatıldı" : "Zamanlayıcı devam ediyor");
}

function sendNotification() {
  alert("Zaman doldu!");
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

document.getElementById("timer").addEventListener("click", function () {
  if (destroyPoint === 0) {
    const duraklatBtn = document.getElementById("duraklat-btn");
    duraklatBtn.style.display = "none"
    console.log("0");
    destroyPoint = 1;
    destroyed()
  }
});

document.querySelector("#btn").addEventListener("click", function () {
  startTimer()
  if (destroyPoint === 1) {
    const duraklatBtn = document.getElementById("duraklat-btn");
    duraklatBtn.style.display = "block"
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
      const imageUrl = e.target.result;
      // Seçilen resmi localStorage'a kaydet
      localStorage.setItem('backgroundImage', imageUrl);

      document.body.style.backgroundImage = `url('${imageUrl}')`;
      navbar.style.backgroundImage = `url('${imageUrl}')`;
    };

    reader.readAsDataURL(file);
  } else {
    alert("Lütfen bir resim dosyası seçin.");
  }
});

// Sayfa yüklenince localStorage'dan resmi çek
window.addEventListener('load', () => {
  const savedImage = localStorage.getItem('backgroundImage');
  const navbar = document.getElementById("navbar");

  if (savedImage) {
    document.body.style.backgroundImage = `url('${savedImage}')`;
    navbar.style.backgroundImage = `url('${savedImage}')`;
  }
});

const soz = document.getElementById("ozluSoz");

soz.addEventListener("change", function () {
  if (soz.checked) {
    const text = document.getElementById("motivation");
    text.style.display = "inline"
  } else {
    const text = document.getElementById("motivation");
    text.style.display = "none";
  };
});

const musicCheck = document.getElementById("music-check")
const music = document.getElementById("music")
musicCheck.addEventListener("change", function () {
  if (musicCheck.checked) {
    music.play();
    const audioPlayer = document.getElementById('music');
    const sesKontrol = document.getElementById('sesKontrol');
    sesKontrol.style.display = "inline-block";
    sesKontrol.addEventListener('input', function () {
      audioPlayer.volume = this.value;
    });
  } else {
    music.pause();
    sesKontrol.style.display = "none";
  };
})

let navbarPoint = 1;
const carp = document.getElementById("carpi");
const settings = document.getElementById("settings");

settings.addEventListener("click", function () {
  if (navbarPoint === 1) {
    const navbar = document.getElementById("navbar");
    navbar.style.display = "block"
    navbar.style.position = "fixed"
    navbar.style.left = "0"
    navbar.style.top = "0"
    navbarPoint = 0
  };
});

carp.addEventListener("click", function () {
  if (navbarPoint === 0) {
    const navbar = document.getElementById("navbar");
    navbar.style.display = "none"
    navbar.style.position = ""
    navbar.style.left = ""
    navbar.style.top = ""
    navbarPoint = 1
  }
})

document.addEventListener('DOMContentLoaded', function() {
  let themePoint = localStorage.getItem("themePoint") === "0" ? 0 : 1;
  const theme = document.getElementById("theme");

  // Temayı uygula
  if (themePoint === 0) {
    document.documentElement.style.setProperty('--white-color', '#000');
    document.documentElement.style.setProperty('--black-color', '#fff');
    document.documentElement.style.setProperty('--gray-color', '#fff');
    if (theme) theme.innerText = "Koyu Tema";
  } else {
    document.documentElement.style.setProperty('--gray-color', '#808080');
    document.documentElement.style.setProperty('--white-color', '#fff');
    document.documentElement.style.setProperty('--black-color', '#000');
    if (theme) theme.innerText = "Açık Tema";
  }

  // Buton varsa, click event'ini bağla
  if (theme) {
    theme.addEventListener("click", function () {
      if (themePoint === 1) {
        document.documentElement.style.setProperty('--white-color', '#000');
        document.documentElement.style.setProperty('--black-color', '#fff');
        document.documentElement.style.setProperty('--gray-color', '#fff');
        theme.innerText = "Koyu Tema";
        themePoint = 0;
      } else {
        document.documentElement.style.setProperty('--gray-color', '#808080');
        document.documentElement.style.setProperty('--white-color', '#fff');
        document.documentElement.style.setProperty('--black-color', '#000');
        theme.innerText = "Açık Tema";
        themePoint = 1;
      }
      localStorage.setItem("themePoint", themePoint);
    });
  }
});