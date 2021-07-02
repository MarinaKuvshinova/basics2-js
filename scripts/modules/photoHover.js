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

export default photoHover;