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

export default toggleMenu;