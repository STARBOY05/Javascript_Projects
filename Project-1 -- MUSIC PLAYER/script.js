const musicContainer = document.querySelector(".music-container");
const backBtn = document.querySelector("#back");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const fastBtn = document.querySelector("#fast");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// SONGS
const songs = ['Hall Of Fame', 'Uptown Funk', 'Counting Stars'];
const colors = ['red', 'blue', 'yellow'];
// Keep Track of Songs
let songIndex = 0;
let colorIndex = 0;
// Initial Load
loadSong(songs[songIndex], colors[colorIndex]);

// Update Songs
function loadSong(song) {
    title.textContent = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
    musicContainer.style.backgroundColor = `${colors[colorIndex]}`
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    musicContainer.style.backgroundColor = `${colors[colorIndex]}`
    audio.play(); // JS Audio API
}

function pauseSong() {
    musicContainer.classList.remove('play');
    // To Toggle Play/Pause Icons
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    musicContainer.style.backgroundColor = "black";
    audio.pause(); // JS Audio API
}

// Previous song
function prevSong() {
    songIndex--;
    colorIndex--;
    console.log(songIndex);
    if (songIndex < 0 && colorIndex < 0) {
        songIndex = songs.length - 1;
        colorIndex = colors.length - 1;
    }
    loadSong(songs[songIndex], colors[colorIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    colorIndex++;
    if (songIndex > songs.length - 1 && colorIndex > colors.length - 1) {
        songIndex = 0;
        colorIndex = 0;
    }
    loadSong(songs[songIndex], colors[colorIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

//  EventListeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
});
// Change Songs
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
// Song ends
audio.addEventListener('ended', nextSong);
