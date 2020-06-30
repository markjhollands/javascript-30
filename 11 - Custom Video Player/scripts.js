/********************/
/* Get our elements */
/********************/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full__screen');

/***********************/
/* Build our functions */
/***********************/
const togglePlay = () => video.paused ? video.play() : video.pause();
const updateButton = e => toggle.innerHTML = e.target.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
const skip = e => video.currentTime += parseFloat(e.target.dataset.skip);
const handleRangeUpdate = e => video[e.target.name] = e.target.value;
const handleProgress = () => {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
const scrub = e => video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
const toggleFullScreen = () => {
    // We do not need to handle exit full screen because we have not disabled native
    // controls for full screen mode.
    //
    // As this is education, and for reference, I have added the required code.

    if (document.fullscreenElement && document.fullscreenElement.nodeName == 'VIDEO') {
        // in full screen - exit full screen
        if (typeof document.exitFullscreen === "function") {
            document.exitFullscreen();
        } else if (typeof document.mozCancelFullScreen === "function") { // Firefox
            document.mozCancelFullScreen();
        } else if (typeof document.webkitExitFullscreen === "function") { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (typeof document.msExitFullscreen === "function") { // IE and Edge
            document.msExitFullscreen();
        }
    } else {
        // not in full screen - go full screen
        if (typeof video.requestFullscreen === "function") {
            video.requestFullscreen();
        } else if (typeof video.mozRequestFullScreen === "function") { // Firefox
            video.mozRequestFullScreen();
        } else if (typeof video.webkitRequestFullscreen === "function") { // Chrome, Safari and Opera
            video.webkitRequestFullscreen();
        } else if (typeof video.msRequestFullscreen === "function") { // IE and Edge
            video.msRequestFullscreen();
        }
    }
}

/*******************************/
/* Hook up the event listeners */
/*******************************/

/* Video */
video.addEventListener('click', togglePlay);
['play', 'pause'].forEach(event => video.addEventListener(event, updateButton));
video.addEventListener('timeupdate', handleProgress);

/* Progress bar */
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', e => mousedown && scrub(e));

/* Controls */
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => ['change', 'mousemove'].forEach(event => range.addEventListener(event, handleRangeUpdate)));
fullScreen.addEventListener('click', toggleFullScreen);