window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //Timer
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

    countTimer('01 july 2021');

    //menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul > li');

        const handlerMnu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', () => {
            handlerMnu();
        });

        closeBtn.addEventListener('click', () => {
            handlerMnu();
        });
        menuItems.forEach(elem => elem.addEventListener('click', handlerMnu));
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = popup.querySelector('.popup-close'),
            popupContent = popup.querySelector('.popup-content');

        let animationInterval;
        const animationShow = (left = 50) => {
            left--;
            popupContent.style.margin = `0 0 0 -${left}vw`;
            clearInterval(animationInterval);
            animationInterval = setInterval(() => animationShow(left), 10);

            if (left <= 0) {
                clearInterval(animationInterval);
            }
        };

        const animationHide = (left = 0) => {
            left++;
            popupContent.style.margin = `0 0 0 -${left}vw`;
            clearInterval(animationInterval);
            animationInterval = setInterval(() => animationHide(left), 10);

            if (left >= 80) {
                clearInterval(animationInterval);
            }
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                if (window.innerWidth > 768) {
                    popupContent.style.margin = '0 0 0 -100vw';
                    setTimeout(() => {
                        animationShow();
                    }, 200);
                } else {
                    popupContent.style.margin = '0';
                }
                popup.style.display = 'block';
            });
        });

        popupClose.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                animationHide();
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 1000);
            } else {
                popup.style.display = 'none';
            }
        });

    };
    togglePopup();

    //scroll
    const scrollToSection = () => {
        const navItem = document.querySelectorAll('menu ul a'),
            buttonScroll = document.querySelector('main > a');

        const scrolling = elem => {
            const idSection = elem.getAttribute('href').slice(1),
                topPositionSection = document.getElementById(idSection).offsetTop;

            window.scrollTo({
                top: topPositionSection,
                behavior: "smooth"
            });
        };

        navItem.forEach(elem => {
            elem.addEventListener('click', () => scrolling(elem));
        });
        buttonScroll.addEventListener('click', e => scrolling(e.currentTarget));
    };
    scrollToSection();
});
