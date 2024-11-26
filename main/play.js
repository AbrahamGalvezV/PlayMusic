// Lista de canciones: cada objeto contiene el título, la ruta del audio y la imagen
const songList = [
  { title: "Low Down Rolling Stone", file: "../songlist/Low Down Rolling Stone .mp3", cover: "../img/comeBack.png" },
  { title: "Corduroy", file: "../songlist/Corduroy .mp3", cover: "../img/corduroy.png" },
  { title: "Come Together", file: "../songlist/Come Together .mp3", cover: "../img/comeTogethrt.png" },
  { title: "Muddy water", file: "../songlist/Muddy water.mp3", cover: "../img/moddy.png" },
  { title: "The Comedown", file: "../songlist/The Comedown.mp3", cover: "../img/comedon.png" },
];

// Selección de elementos clave del DOM
const audioElement = document.querySelector("#audio");
const coverImg = document.querySelector("#cover-img");
const songTitle = document.querySelector("#song-title");
const seekBar = document.querySelector("#seek-bar");
const currentTimeEl = document.querySelector("#current-time");
const totalDurationEl = document.querySelector("#total-duration");
const playButton = document.querySelector("#play-btn");
const prevButton = document.querySelector("#prev-btn");
const nextButton = document.querySelector("#next-btn");
const toggleListButton = document.querySelector("#toggle-list-btn");
const songListContainer = document.querySelector("#song-list");

let currentSongIndex = 0;

// Función para cargar una canción
function loadSong(index) {
  const song = songList[index];
  audioElement.src = song.file;
  coverImg.src = song.cover;
  songTitle.textContent = song.title;
}

// Mostrar/Ocultar la lista de canciones
toggleListButton.addEventListener("click", () => {
  songListContainer.classList.toggle("visible");
});

//
document.getElementById("toggle-list-btn").addEventListener("click", () => {
  const listContainer = document.getElementById("song-list-container");
  listContainer.classList.toggle("visible");
});


// Generar dinámicamente la lista de canciones
songList.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audioElement.play();
    playButton.style.backgroundImage = "url('./img/pause.png')";
  });
  songListContainer.appendChild(li);
});

// Función para reproducir/pausar la canción
function togglePlay() {
  if (audioElement.paused) {
    audioElement.play();
    playButton.style.backgroundImage = "url('./img/pause.png')";
  } else {
    audioElement.pause();
    playButton.style.backgroundImage = "url('./img/play.png')";
  }
}

// Actualizar la barra de progreso
function updateSeekBar() {
  seekBar.value = (audioElement.currentTime / audioElement.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audioElement.currentTime);
  if (audioElement.currentTime === audioElement.duration) {
    changeSong(1);
  }
}

// Formatear el tiempo en minutos:segundos
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Cambiar canción
function changeSong(direction) {
  currentSongIndex = (currentSongIndex + direction + songList.length) % songList.length;
  loadSong(currentSongIndex);
  audioElement.play();
}

// Eventos de control
playButton.addEventListener("click", togglePlay);
prevButton.addEventListener("click", () => changeSong(-1));
nextButton.addEventListener("click", () => changeSong(1));
audioElement.addEventListener("timeupdate", updateSeekBar);
audioElement.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audioElement.duration);
});
seekBar.addEventListener("input", () => {
  audioElement.currentTime = (seekBar.value / 100) * audioElement.duration;
});

// Cargar la primera canción
loadSong(currentSongIndex);
