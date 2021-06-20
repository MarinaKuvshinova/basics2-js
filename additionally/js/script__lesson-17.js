window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const timer = () => {
        const timer = document.querySelector('.timer'),
            date = new Date(),
            nameDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            getTimer = () => {
                const p = document.createElement('p');
                p.textContent = `Текущее время: ${date.toLocaleTimeString('en')}`;
                return p;
            },
            getDay = () => {
                const p = document.createElement('p'),
                    day = date.getDay();

                p.textContent = `Сегодня: ${nameDays[day]}`;
                return p;
            },
            greeting = () => {
                const p = document.createElement('p'),
                    hours = date.getHours();
                let text;

                if (hours <= 12 && hours >= 6) {
                    text = 'Доброе утро';
                }

                if (hours < 12 && hours <= 18) {
                    text = 'Добрый день';
                }

                if (hours > 18 && hours <= 24) {
                    text = 'Добрый вечер';
                }

                if (hours < 6) {
                    text = 'Доброй ночи';
                }

                p.textContent = text;
                return p;
            },
            amountDaysForNewYear = () => {
                const p = document.createElement('p'),
                    days = Math.floor((date - new Date(date.getFullYear(), 12, 1)) / (1000 * 60 * 60 * 24)) * -1;
                let textDay;
                switch (days.toString().slice(-1)) {
                case '1':
                    textDay = 'день';
                    break;
                case '2':
                case '3':
                case '4':
                    textDay = 'дня';
                    break;
                default:
                    textDay = 'дней';
                    break;
                }
                p.textContent = `До нового года осталось: ${days} ${textDay}`;
                return p;
            };

        timer.innerHTML = '';
        timer.appendChild(greeting());
        timer.appendChild(getDay());
        timer.appendChild(getTimer());
        timer.appendChild(amountDaysForNewYear());
    };

    setInterval(timer, 1000);

});
