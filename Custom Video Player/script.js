// const video = document.getElementById("video");
// const play = document.getElementById("play");
// const stop = document.getElementById("stop");
// const progress = document.getElementById("progress");
// const timestamp = document.getElementById("timestamp");

// //Play & Pause Video
// function toggleVideoStatus() {
//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }
// }
// //update play/pause icon
// function updatePlayIcon() {
//   play.innerHTML = video.paused
//     ? '<i class="fa fa-play fa-2x"></i>'
//     : '<i class="fa fa-pause fa-2x"></i>';
// }

// //Update progress & timestamp
// function updateProgress() {
//   progress.value = (video.currentTime / video.duration) * 100;

//   //Get minutes
//   let mins = Math.floor(video.currentTime / 60);
//   if (mins < 10) {
//     mins = '0' + String(mins);
//   }

//   //Get seconds
//   let secs = Math.floor(video.currentTime % 60);
//   if (secs < 10) {
//     secs = '0' + String(secs);
//   }

//   timestamp.innerHTML = `${mins}:${secs}`;
// }

// //Set video time to progress
// function setVideoProgress() {
//   // video.currentTime = (+progress.value * video.duration) / 100;
// //   video.removeEventListener("timeupdate", updateProgress);

//   video.currentTime = (+progress.value * video.duration) / 100;

//   // Re-attach timeupdate event listener
// //   video.addEventListener("timeupdate", updateProgress);
// }

// //Stop video
// function stopVideo() {
//   video.currentTime = 0;
//   video.pause();
// }

// // Event Listener
// video.addEventListener('click', toggleVideoStatus);
// video.addEventListener('pause', updatePlayIcon);
// video.addEventListener('play', updatePlayIcon);
// video.addEventListener('timeupdate', updateProgress);

// play.addEventListener('click', toggleVideoStatus);

// stop.addEventListener('click', stopVideo);

// progress.addEventListener('input', setVideoProgress);

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const play = document.getElementById("play");
  const stop = document.getElementById("stop");
  const progress = document.getElementById("progress");
  const timestamp = document.getElementById("timestamp");

  function toggleVideoStatus() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
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
  }

  video.addEventListener("click", toggleVideoStatus);
  video.addEventListener("pause", updatePlayIcon);
  video.addEventListener("play", updatePlayIcon);
  video.addEventListener("timeupdate", updateProgress);

  play.addEventListener("click", toggleVideoStatus);
  stop.addEventListener("click", stopVideo);

  // Use the 'input' event instead of 'change'
  progress.addEventListener("input", setVideoProgress);
});

/*
    Issue faced: I noticed that clicking the progress bar multiple times was required to select a particular time. To resolve this issue, I initially considered that the timeupdate event, firing frequently as the video progresses, might be getting mixed up during rapid clicks.

    1st solution attempted:
    - Created a function setVideoProgress() to set the video time to the progress value.
    - Temporarily removed the timeupdate event listener before setting the video progress.
    - Set the video time based on the progress value.
    - Re-attached the timeupdate event listener afterward.

    Example:
    function setVideoProgress() {
        // Remove timeupdate event listener temporarily
        video.removeEventListener('timeupdate', updateProgress);

        video.currentTime = (+progress.value * video.duration) / 100;

        // Re-attach timeupdate event listener
        video.addEventListener('timeupdate', updateProgress);
    }

    Unfortunately, this solution didn't resolve the issue.

    2nd solution:
    - Tried a different approach using the input event for the progress bar.
    - This event triggers while the user is dragging the slider, avoiding multiple events firing rapidly during quick clicks.
    
    Example:
    progress.addEventListener('input', setVideoProgress);

    This modification successfully prevented multiple events from being triggered rapidly when clicking on the progress bar.
*/
