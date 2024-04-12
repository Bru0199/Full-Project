document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const play = document.getElementById("play");
  const stop = document.getElementById("stop");
  const progress = document.getElementById("progress");
  const timestamp = document.getElementById("timestamp");

  function toggleVideoStatus() {
    if (video.paused) {
      video.play();
      setVideoDimensions();
      setPosterDimensions();
    } else {
      video.pause();
      resetDimensions();
    }
  }

  function updatePlayIcon() {
    play.innerHTML = video.paused
      ? '<i class="fa fa-play fa-2x"></i>'
      : '<i class="fa fa-pause fa-2x"></i>';
  }

  function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
      mins = "0" + String(mins);
    }
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
      secs = "0" + String(secs);
    }
    timestamp.innerHTML = `${mins}:${secs}`;
  }

  function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
  }

  function stopVideo() {
    video.currentTime = 0;
    video.pause();
    resetDimensions();
  }

  function setVideoDimensions() {
    video.style.width = "35%";
    video.style.height = "auto";
  }

  function setPosterDimensions() {
    const poster = document.querySelector(".screen::poster");
    if (poster) {
      poster.style.width = "100%";
      poster.style.height = "100%";
      poster.style.objectFit = "cover";
    }
  }

  function resetDimensions() {
    video.style.width = "";
    video.style.height = "";
    const poster = document.querySelector(".screen::poster");
    if (poster) {
      poster.style.width = "";
      poster.style.height = "";
      poster.style.objectFit = "";
    }
  }

  video.addEventListener("click", toggleVideoStatus);
  video.addEventListener("pause", function () {
    updatePlayIcon();
    resetDimensions();
  });
  video.addEventListener("play", updatePlayIcon);
  video.addEventListener("timeupdate", updateProgress);

  play.addEventListener("click", toggleVideoStatus);
  stop.addEventListener("click", stopVideo);

  // Use the 'input' event instead of 'change'
  progress.addEventListener("input", setVideoProgress);
});
