const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const toggleListBtn = document.getElementById("toggle-list-btn");
const songList = document.getElementById("song-list");
const seekBar = document.getElementById("seekBar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");
const coverImg = document.getElementById("cover-img");
const songTitle = document.getElementById("song-title");
let songs = Array.from(songList.children);
let currentSongIndex = 0;

//------------------------------------------------------------------

// Cargar canción inicial
function loadSong(song) {
    audio.src = song.dataset.title;
    coverImg.src = song.dataset.title;
}

// Play/stop
function togglrPlay() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸️"
    } else {
        audio.pause();
        playBtn.textContent = "⏸️";
    }
}

// Cambiar sanción 
function changeSong(step) {
    currentSongIndex = (currentSongIndex + step + song.length) % songs.length;
     loadSong(songs[currentSongIndex]);
     audio.play();
     playBtn.textContent = "⏸️";
}

// Actualizar la barra de progreso
audio.addEventListtener("timeoupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100)* audio.duration;
})

audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

// Formatear tiempo
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:{seconds < 10 ? "0" :""}${seconds}`;
}

// Mostrar/Ocultar lista de canciones
toggleListBtn.addEventListener("click", () => {
    songList.classList.toggle("hidden");
});

// Seleccionar canción de la lista
songs.forEach((song, index) => {
    song.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(song);
        audio.play();
        playBtn.textContent = "⏸️";
    });
    
});

// Controles
playBtn.addEventListener("click", togglrPlay);
prevBtn.addEventListener("click", () => changeSong(-1));
nextBtn.addEventListener("click", () => changeSong(1));

// Cargar la primera canción al iniciar
loadSong(songs[currentSongIndex]);