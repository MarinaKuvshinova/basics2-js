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


        const animationShow = (left = 50) => {
            left--;
            let animationInterval;
            popupContent.style.margin = `0 0 0 -${left}vw`;
            cancelAnimationFrame(animationInterval);
            animationInterval = requestAnimationFrame(() => animationShow(left));

            if (left <= 0) {
                cancelAnimationFrame(animationInterval);
            }
        };

        const animationHide = (left = 0) => {
            left++;
            let animationInterval;
                popupContent.style.margin = `0 0 0 -${left}vw`;
            // cancelAnimationFrame(animationInterval); 
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
                    switch (type) {
                    case 'number':
                        e.target.value = e.target.value.replace(/\D/g, '');
                        break;
                    case 'text':
                        e.target.value = e.target.value.replace(/[^а-яё -]/uig, '');
                        break;
                    case 'email':
                        e.target.value = e.target.value
                            .replace(/[^a-z@\-_\.!\~\'*]+/ig, '')
                            .replace(/[,\/#$%\^&;:{}=\`()\[\]]/g, '');
                        break;
                    case 'phone':
                        e.target.value = e.target.value.replace(/[^\d()-+]/ig, '');
                        break;
                    }
                });
                input.addEventListener('blur', e => {
                    let value = e.target.value;
                    value = value.replace(/([- ])[- ]*(?:[- ]*[- ]+)?/g, '$1');
                    value = value.replace(/(^[- ]*|[- ]*$)/g, '');

                    if (e.target.getAttribute('name') === 'user_name') {
                        value = value.toLowerCase().replace(/(\S)+/gui,
                            match => match[0].toUpperCase() + match.slice(1));
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

    //калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                countToTal = 0,
                interval = null;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            const counted = () => {
                if (countToTal === total) {
                    clearInterval(interval);
                } else {
                    countToTal += 100;
                    totalValue.textContent = countToTal;
                }
            };
            interval = setInterval(counted, 100);
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }

        });
    };
    calc(100);

    //валидация
    class Validator {
        constructor({ selector, pattern = {}, method }) {
            this.form = document.querySelector(selector);
            this.pattern = pattern;
            this.method = method;
            this.elementsForm = [...this.form.elements].filter(item =>
                item.tagName.toLowerCase() !== 'button' && item.type !== 'button'
            );
            this.error = new Set();
        }

        init(callback) {
            this.applyStyle();
            this.setPattern();
            this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
            this.form.addEventListener('submit', e => {
                this.elementsForm.forEach(elem => this.checkIt({ target: elem }));

                if (this.error.size) {
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    callback(this.form.id);
                }
            });
        }

        isValid(elem) {
            const validatorMethod = {
                notEmpty(elem) {
                    if (elem.value.trim() === '') {
                        return false;
                    }
                    return true;
                },
                pattern(elem, pattern) {
                    return  pattern.test(elem.value);
                }
            };

            if (this.method) {
                const method = this.method[elem.id];

                if (method) {
                    return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
                }
            } else {
                console.warn('Необходимо передать idполей ввода и методы проверки этих полей');
            }

            return true;
        }

        checkIt(event) {
            const target = event.target;

            if (this.isValid(target)) {
                this.showSuccess(target);
                this.error.delete(target);
            } else {
                this.showError(target);
                this.error.add(target);
            }
        }

        showError(elem) {
            elem.classList.remove('success');
            elem.classList.add('error');

            if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
                return;
            }

            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Ошибка в этом поле';
            errorDiv.classList.add('validator-error');
            elem.insertAdjacentElement('afterend', errorDiv);
        }

        showSuccess(elem) {
            elem.classList.remove('error');
            elem.classList.add('success');
            if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
                elem.nextElementSibling.remove();
            }
        }

        applyStyle() {
            const style = document.createElement('style');
            style.textContent = `
                input.success {
                    border: 2px solid green
                }
                input.error {
                    border: 2px solid red;
                }
                .validator-error {
                    font-size: 10px;
                    color: red;
                    margin: -15px 0 0;
                }`;
            document.head.appendChild(style);
        }

        setPattern() {
            if (!this.pattern.phone) {
                this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
            }

            if (!this.pattern.email) {
                this.pattern.email = /^\w+@\w+\.\w{2,}$/;
            }
        }
    }

    const valid1 = new Validator({
        selector: '#form1',
        pattern: {
            'name': /[а-яё ]/uig,
            'phone': /[\+?0-9]{7,10}/
        },
        method: {
            'form1-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form1-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ],
            'form1-name': [
                ['notEmpty'],
                ['pattern', 'name']
            ]
        }
    });

    const valid2 = new Validator({
        selector: '#form2',
        pattern: {
            'name': /[а-яё ]/uig,
            'phone': /[\+?0-9]{7,10}/,
            'message': /[а-яё 0-9.,:;!?-]/uig
        },
        method: {
            'form2-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form2-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ],
            'form2-name': [
                ['notEmpty'],
                ['pattern', 'name']
            ],
            'form2-message': [
                ['pattern', 'message']
            ]
        }
    });
    // valid2.init();

    const valid3 = new Validator({
        selector: '#form3',
        pattern: {
            'name': /[а-яё ]/uig,
            'phone': /[\+?0-9]{7,10}/
        },
        method: {
            'form3-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form3-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ],
            'form3-name': [
                ['notEmpty'],
                ['pattern', 'name']
            ]
        }
    });
    // valid3.init();

    //send ajax-form
    const sendForm = formId => {
        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы свами свяжемся!',
            form = document.getElementById(formId),
            statusMessage = document.createElement('div'),
            loader = document.createElement('div');

        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();

                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
    
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(request.status);
                    }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json'); //'multipart/form-data'
    
                request.send(JSON.stringify(body));
            });
        };

        statusMessage.className = 'loaded';
        loader.className = 'sk-rotating-plane';

        // form.addEventListener('submit', event => {
        // event.preventDefault();
        form.appendChild(loader);
        form.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(form),
            body = {};

        // for (let val of formData.entries()) {
        //     body[val[0]] = val[1];
        // }
        formData.forEach((value, key) => {
            body[key] = value;
        });
        postData(body)
            .then(() => {
                statusMessage.textContent = successMessage;
                loader.remove();
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            }).catch(error => {
                statusMessage.textContent = errorMessage;
                loader.remove();
                console.error(error);
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
        });
        // });
    };

    valid1.init(sendForm);
    valid2.init(sendForm);
    valid3.init(sendForm);
    // sendForm('form1');
    // sendForm('form2');
    // sendForm('form3');
});
