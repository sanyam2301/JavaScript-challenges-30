let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countDown)
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        if (secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    let display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    timerDisplay.textContent = display;
    document.title = display;

}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    const hours = end.getHours();
    const mins = end.getMinutes();
    endTime.textContent = `Be back at ${hours < 10 ? '0' : ''}${hours > 12 ? hours - 12 : hours}:${mins < 10 ? '0' : ''}${mins} ${hours > 12 ? 'PM' : 'AM'}`;
}


function startTimer() {
    // console.log(this.dataset.time);
    seconds = (parseInt(this.dataset.time));
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})