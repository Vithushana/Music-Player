document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".content");
    const playImage = content.querySelector(".music-image img");
    const musicName = content.querySelector(".music-titles .name");
    const musicArtist = content.querySelector(".music-titles .artist");
    const audio = document.querySelector(".main-song");
    const playBtn = content.querySelector(".play-pause");
    const prevBtn = content.querySelector("#prev");
    const nextBtn = content.querySelector("#next");
    const progressBar = content.querySelector(".progress-bar span");
    const progressDetails = content.querySelector(".progress-details");
    const repeatBtn = content.querySelector("#repeat");
    const shuffleBtn = content.querySelector("#shuffle");
  
    let index = 0;
  
    function loadData() {
      const song = songs[index];
      if (song) {
        musicName.textContent = song.name;
        musicArtist.textContent = song.artist;
        playImage.src = `images/${song.img}.jpg`;
        audio.src = `music/${song.audio}.mp3`;
        audio.load();
        playSong();
      }
    }
  
    function togglePlayPause() {
      content.classList.toggle("paused");
      if (content.classList.contains("paused")) {
        playBtn.textContent = "pause";
        audio.play();
      } else {
        playBtn.textContent = "play_arrow";
        audio.pause();
      }
    }
  
    function playSong() {
      content.classList.add("paused");
      playBtn.textContent = "pause";
      audio.play();
    }
  
    function pauseSong() {
      content.classList.remove("paused");
      playBtn.textContent = "play_arrow";
      audio.pause();
    }
  
    function nextSong() {
      index = (index + 1) % songs.length;
      loadData();
    }
  
    function prevSong() {
      index = (index - 1 + songs.length) % songs.length;
      loadData();
    }
  
    function updateProgress() {
      const { currentTime, duration } = audio;
      if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
  
        const formatTime = (time) => {
          const minutes = Math.floor(time / 60).toString().padStart(2, "0");
          const seconds = Math.floor(time % 60).toString().padStart(2, "0");
          return `${minutes}:${seconds}`;
        };
  
        content.querySelector(".current").textContent = formatTime(currentTime);
        content.querySelector(".final").textContent = formatTime(duration);
      }
    }
  
    function seekMusic(e) {
      const progressValue = progressDetails.clientWidth;
      const clickedOffsetX = e.offsetX;
      audio.currentTime = (clickedOffsetX / progressValue) * audio.duration;
    }
  
    function toggleRepeat() {
      audio.loop = !audio.loop;
      repeatBtn.classList.toggle("active", audio.loop);
    }
  
    function shuffleSongs() {
      index = Math.floor(Math.random() * songs.length);
      loadData();
    }
  
    playBtn.addEventListener("click", togglePlayPause);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);
    repeatBtn.addEventListener("click", toggleRepeat);
    shuffleBtn.addEventListener("click", shuffleSongs);
    audio.addEventListener("timeupdate", updateProgress);
    progressDetails.addEventListener("click", seekMusic);
    audio.addEventListener("ended", nextSong);
  
    // Initialize the first song
    loadData();
  });
  
  class Song {
    constructor(name, artist, img, audio) {
      this.name = name;
      this.artist = artist;
      this.img = img;
      this.audio = audio;
    }
  }
  
  const songs = [
    new Song("Chammak Challo", "Vishal-Shekhar", "i1", "Chammak"),
    new Song("Illuminati", "Sushin Shyam, Dabzee", "i2", "Illuminati"),
    new Song("Calm Down", "Rema", "i3", "calmdown"),
    new Song("Gasolina", "Daddy Yankee", "i4", "Gasolina"),
    new Song("Shape of You", "Ed Sheeran", "i5", "Shapeofyou")
  ];
  