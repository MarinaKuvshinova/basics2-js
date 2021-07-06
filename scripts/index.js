'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scrollToSection from './modules/scrollToSection';
import tabs from './modules/tabs';
import slider from './modules/slider';
import photoHover from './modules/photoHover';
import validate from './modules/validate';
import calc from './modules/calc';
import Validator from './modules/Validator';
import sendForm from './modules/sendForm';
import SliderCarousel from './modules/SliderCarousel';

//Timer
countTimer('10 july 2021');

//menu
toggleMenu();

//popup
togglePopup();

//scroll
scrollToSection();

//табы
tabs();

//слайдер
slider();

//фото команды
photoHover();

//валидация
validate();

//калькулятор
calc(100);

//валидация
const valid1 = new Validator({
    selector: '#form1',
    pattern: {
        'name': /[а-яё ]/uig,
        'phone': /^[\+?0-9]{7,10}$/
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
        'phone': /^[\+?0-9]{7,10}$/,
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
        'phone': /^[\+?0-9]{7,10}$/
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


valid1.init(sendForm);
valid2.init(sendForm);
valid3.init(sendForm);
// sendForm('form1');
// sendForm('form2');
// sendForm('form3');

const carousel = new SliderCarousel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    prev: '#test-left',
    next: '#test-right',
    slidesToShow: 4,
    infinity: true,
    responsive: [{
        breakpoint: 1024,
        slidesToShow: 3
    },
    {
        breakpoint: 768,
        slidesToShow: 2
    },
    {
        breakpoint: 576,
        slidesToShow: 1
    }
]
});
carousel.init();