window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const animation = () => {
        let requestAnimation,
            showAnimetion = true,
            flagBottom = 1,
            flagLeft = 1;

        const sectionAnimation = document.querySelector('.animation'),
            buttonAnimation = sectionAnimation.querySelector('.start'),
            buttonAnimationReset = sectionAnimation.querySelector('.reset'),
            windowWidth = document.body.clientWidth,
            windowHeight = document.body.clientHeight,
            ball = () => {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.style.cssText = `position: absolute;
                top: 0;
                left: 0;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: red;`;

                return ball;
            },
            animationBall = () => {
                const ball = document.querySelector('.ball'),
                    ballWidth = ball.getBoundingClientRect().width,
                    ballHeight = ball.getBoundingClientRect().height,
                    step = 3,
                    ballLeft = ball.getBoundingClientRect().left,
                    ballTop = ball.getBoundingClientRect().top;

                if (ballTop + ballHeight > windowHeight || ballTop < 0) {
                    flagBottom *= -1;
                }

                ball.style.top = ballTop + step * flagBottom + 'px';

                if (ballLeft + ballWidth > windowWidth || ballLeft < 0) {
                    flagLeft *= -1;
                }

                ball.style.left = ballLeft + step * flagLeft + 'px';
                requestAnimation = requestAnimationFrame(animationBall);
            };

        sectionAnimation.append(ball());
        buttonAnimation.addEventListener('click', e => {
            if (!showAnimetion) {
                cancelAnimationFrame(requestAnimation);
                e.target.innerText = 'start';
            } else {
                requestAnimation = requestAnimationFrame(animationBall);
                e.target.innerText = 'stop';
            }
            showAnimetion = !showAnimetion;
        });
        buttonAnimationReset.addEventListener('click', () => {
            const ball = document.querySelector('.ball');

            cancelAnimationFrame(requestAnimation);
            showAnimetion = true;
            flagBottom = 1;
            flagLeft = 1;
            ball.style.left = 0;
            ball.style.top = 0;
            buttonAnimation.innerText = 'start';

        });
    };
    animation();

    const inputText = () => {
        const textContainer = document.querySelector('.text'),
            input = textContainer.querySelector('input'),
            textBox = textContainer.querySelector('p'),
            getText = () => {
                textBox.textContent = input.value;
            },
            debounce = (callback, delay) => {
                let timeoutHandler = null;
                return function() {
                    clearTimeout(timeoutHandler);
                    timeoutHandler = setTimeout(() => {
                        callback();
                    }, delay);
                };
            },
            throttle = (callback, delay) => {
                let timeoutHandler = null;
                return function() {
                    if (timeoutHandler === null) {
                        timeoutHandler = setTimeout(() => {
                            callback();
                            timeoutHandler = null;
                        }, delay);
                    }
                };
            };
        ///выводим текст кусками через каждые 300
        input.addEventListener('input', throttle(getText, 300));
        
        //ждем когда текст перестанут вводить и вставляем куском
        // input.addEventListener('input', debounce(getText, 300));
    };
    inputText();

});
