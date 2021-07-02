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

export default scrollToSection;