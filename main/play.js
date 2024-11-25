// Lista de canciones: cada objeto contiene el título, la ruta del audio y la imagen
const songList = [
  {
    title: "Low Down Rolling Stone",
    file: "/songlist/Low Down Rolling Stone .mp3",
    cover: "/img/comeBack.png",
  },
  {
    title: "Corduroy",
    file: "/songlist/Corduroy .mp3",
    cover: "/img/corduroy.png",
  },
  {
    title: "Come Together",
    file: "/songlist/Come Together .mp3",
    cover: "/img/comeTogethrt.png",
  },
  {
    title: "Muddy water",
    file: "/songlist/Muddy water.mp3",
    cover: "/img/moddy.png",
  },
  {
    title: "Come Together",
    file: "/songlist/The Comedown.mp3",
    cover: "/img/comedon.png",
  },
  {
    title: "Corduroy",
    file: "/songlist/Corduroy .mp3",
    cover: "/img/corduroy.png",
  },
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
  audioElement.src = song.file; // Ruta del archivo de audio
  coverImg.src = song.cover; // Ruta de la imagen
  songTitle.textContent = song.title; // Actualización del título
}



// Función para reproducir/pausar la canción
function togglePlay() {
  if (audioElement.paused) {
    audioElement.play(); // Reproducir la canción
    playButton.style.backgroundImage = "url('./img/pause.png')"; // Cambiar a icono de pausa
  } else {
    audioElement.pause(); // Pausar la canción
    playButton.style.backgroundImage = "url('./img/play.png')"; // Cambiar a icono de reproducción
  }
}

// Función para actualizar la barra de progreso
function updateSeekBar() {
  seekBar.value = (audioElement.currentTime / audioElement.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audioElement.currentTime);
  // Cambiar a la siguiente canción
  if (audioElement.currentTime === audioElement.duration) {
    changeSong(1);
  }
}
// console.log(audioElement.duration);


// Formatear el tiempo en minutos:segundos
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Función para cambiar canción
function changeSong(direction) {
  currentSongIndex =
    (currentSongIndex + direction + songList.length) % songList.length;
  loadSong(currentSongIndex);
  audioElement.play();
}

// Mostrar/Ocultar la lista de canciones
toggleListButton.addEventListener("click", () => {
  songListContainer.classList.toggle("hidden");
});

// Generar la lista de canciones dinámicamente
songList.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audioElement.play();
  });
  songListContainer.appendChild(li);
});

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

// Cargar la primera canción al iniciar
loadSong(currentSongIndex);
