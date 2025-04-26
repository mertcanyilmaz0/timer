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

let themePoint = 1
const theme = document.getElementById("theme")
theme.addEventListener("click", function(){
  if(themePoint === 1){
    document.documentElement.style.setProperty('--white-color', '#000');
    document.documentElement.style.setProperty('--black-color', '#fff');
    document.documentElement.style.setProperty('--gray-color', '#fff');
    console.log("0 root");
    theme.innerText = "Koyu Tema"
    themePoint = 0
  } else {
    document.documentElement.style.setProperty('--gray-color', '#808080');
    document.documentElement.style.setProperty('--white-color', '#fff');
    document.documentElement.style.setProperty('--black-color', '#000');
    console.log("1 root");
    theme.innerText = "Açık Tema"
    themePoint = 1
  }
});

const todoList = JSON.parse(localStorage.getItem('todos')) || [];

function renderList() {
  const listElement = document.getElementById('todoList');
  listElement.innerHTML = '';
  todoList.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTodo(index);

    li.appendChild(deleteBtn);
    listElement.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (text) {
    todoList.push(text);
    input.value = '';
    saveTodos();
    renderList();
  }
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodos();
  renderList();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

renderList();

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