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

/***********************/
/* Build our functions */
/***********************/
const togglePlay = () => video.paused ? video.play() : video.pause();
const updateButton = e => toggle.textContent = e.target.paused ? '►' : '❚ ❚';
const skip = e => video.currentTime += parseFloat(e.target.dataset.skip);
const handleRangeUpdate = e => video[e.target.name] = e.target.value;
const handleProgress = () => {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
const scrub = e => video.currentTime = e.offsetX / progress.offsetWidth * video.duration;

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