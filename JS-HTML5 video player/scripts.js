// get our elements


const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullScreen = player.querySelector('.fullScreen')
    // build out functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {

        video.pause();
    }
}

function updatebutton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}


function skip() {
    let skipTime = this.dataset.skip;
    video.currentTime += Number(skipTime);
}

function handleRange() {
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    const progressFill = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${progressFill}%`;

}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function full() {
    if (fullScreen.textContent == ']  [') {
        document.exitFullscreen().then(() => fullScreen.textContent = '[  ]')
    } else {
        player.requestFullscreen().then(() => fullScreen.textContent = ']  [')
    }
}

// add event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatebutton);
video.addEventListener('pause', updatebutton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(
    button => {
        button.addEventListener('click', skip);

    }
)
ranges.forEach(range => {
    range.addEventListener('change', handleRange)
})
let mouseDown = false;
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreen.addEventListener('click', full)
video.addEventListener('dblclick', full)