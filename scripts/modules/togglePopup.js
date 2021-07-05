const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = popup.querySelector('.popup-content');


    const animationShow = (left = 50) => {
        left -= 2;
        let animationInterval;
        popupContent.style.margin = `0 0 0 -${left}vw`;
        cancelAnimationFrame(animationInterval);
        animationInterval = requestAnimationFrame(() => animationShow(left));

        if (left <= 0) {
            cancelAnimationFrame(animationInterval);
        }
    };

    const animationHide = (left = 0) => {
        left += 2;
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
            }, 500);
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
                }, 100);
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

export default togglePopup;