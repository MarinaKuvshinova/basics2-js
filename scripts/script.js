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
        const menu = document.querySelector('menu');
        // btnMenu = document.querySelector('.menu'),
        //     closeBtn = document.querySelector('.close-btn'),
        //     menuItems = menu.querySelectorAll('ul > li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        // btnMenu.addEventListener('click', () => {
        //     handlerMenu();
        // });

        // menu.addEventListener('click', (event) => {
        //     let target = event.target;

        //     if (target.matches('a')) {
        //         handlerMenu();
        //     }
        // });

        document.addEventListener('click', event => {
            const target = event.target;

            if (target.closest('.menu')) {
                handlerMenu();
            }

            if (target.closest('.active-menu') && target.matches('a')) {
                handlerMenu();
            }

            if (menu.classList.contains('active-menu') && !target.closest('.menu') && !target.matches('menu')) {
                handlerMenu();
            }
        });
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = popup.querySelector('.popup-content');

        let animationInterval;

        const animationShow = (left = 50) => {
            left--;
            popupContent.style.margin = `0 0 0 -${left}vw`;
            cancelAnimationFrame(animationInterval);
            animationInterval = requestAnimationFrame(() => animationShow(left));

            if (left <= 0) {
                cancelAnimationFrame(animationInterval);
            }
        };

        const animationHide = (left = 0) => {
            left++;
            popupContent.style.margin = `0 0 0 -${left}vw`;
            cancelAnimationFrame(animationInterval);
            animationInterval = requestAnimationFrame(() => animationHide(left));

            if (left >= 80) {
                cancelAnimationFrame(animationInterval);
            }
        };

        const closePopup = () => {
            if (window.innerWidth > 768) {
                animationHide();
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 1000);
            } else {
                popup.style.display = 'none';
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

        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                closePopup();
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    closePopup();
                }
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

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }


            // while(target !== tabHeader) {
            //     if (target.classList.contains('service-header-tab')) {
            //         tab.forEach((item, i) => {
            //             if (item === target) {
            //                 toggleTabContent(i);
            //             }
            //         });
            //         return;
            //     }

            //     target = target.parentNode;
            // }
        });
    };
    tabs();

    //слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            dots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval,
            dot;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 1500) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        const init = () => {
            for (let i = 0; i < slide.length; i++) {
                const li = document.createElement('li');

                if (i === 0) {
                    li.classList.add('dot-active');
                }

                li.classList.add('dot');
                dots.appendChild(li);
            }

            dot = dots.querySelectorAll('.dot');
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        init();
        startSlide(3000);
    };
    slider();

    //фото команды
    const photoHover = () => {
        const photos = document.querySelectorAll('.command__photo');

        photos.forEach(elem => {
            const src = elem.getAttribute('src'),
                img = elem.dataset.img;
            elem.addEventListener('mouseenter', () => {
                elem.setAttribute('src', img);
                elem.dataset.img = src;
            });
            elem.addEventListener('mouseleave', () => {
                elem.setAttribute('src', src);
                elem.dataset.img = img;
            });
        });
    };
    photoHover();

    //валидация
    const validate = () => {    
        const calcForm = document.querySelector('.calc-block'),
            contactForm = document.querySelector('.footer-form');

        const checkText = (elem, type) => {
            elem.forEach(input => {
                input.addEventListener('input', e => {
                    switch(type) {
                        case 'number': 
                            e.target.value = e.target.value.replace(/\D/g, '');
                            break;
                        case 'text':
                            e.target.value = e.target.value.replace(/[^а-яё -]/uig, '');
                            break;
                        case 'email':
                            e.target.value = e.target.value.replace(/[^a-z@-_.!~'*]+/ig, '').replace(/[,\/#$%\^&;:{}=\`()\[\]]/g,'');
                            break;
                        case 'phone':
                            e.target.value = e.target.value.replace(/[^\d()-]/ig, '');
                            break;
                    }
                });
                input.addEventListener('blur', e => {
                    let value = e.target.value;
                    
                    value = value.replace(/([- ])[- ]*(?:[- ]*[- ]+)?/g,'$1');
                    value = value.replace(/(^[- ]*|[- ]*$)/g,'');

                    if (e.target.getAttribute('name') === 'user_name') {
                        value = value.toLowerCase().replace(/(\S)+/gui, 
                            (match) => match[0].toUpperCase() + match.slice(1));
                    }

                    e.target.value = value;
                });
            });
        };

        //check input in calc form
        checkText(calcForm.querySelectorAll('input[type="text"]'), 'number');

        //check textarea contact form
        checkText(contactForm.querySelectorAll('#form2-message'), 'text');

        //check input text name from
        checkText(document.getElementsByName('user_name'), 'text');
        //check input text email from
        checkText(document.getElementsByName('user_email'), 'email');
        //check input text phone from
        checkText(document.getElementsByName('user_phone'), 'phone');


    };
    validate();
});
