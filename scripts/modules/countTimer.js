const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60) % 24;
            // day = Math.floor (timeRemaining / 60 / 60 / 24);

        return { timeRemaining, hours, minutes, seconds };
    };

    const updateClock = () => {
        const setTime = time => (time > 9 ? time : '0' + time),
            timer = getTimeRemaining();

        let time;

        timerHours.textContent = setTime(timer.hours);
        timerMinutes.textContent = setTime(timer.minutes);
        timerSeconds.textContent = setTime(timer.seconds);

        if (timer.timeRemaining > 0) {
            // setTimeout(updateClock, 1000);
            time = setInterval(updateClock, 1000);
        } else {
            clearInterval(time);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    };

    updateClock();
};

export default countTimer;