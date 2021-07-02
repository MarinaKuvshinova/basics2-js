const sendForm = formId => {
    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы свами свяжемся!',
        form = document.getElementById(formId),
        statusMessage = document.createElement('div'),
        loader = document.createElement('div');

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        // return new Promise((resolve, reject) => {
        //     const request = new XMLHttpRequest();

        //     request.addEventListener('readystatechange', () => {
        //         if (request.readyState !== 4) {
        //             return;
        //         }

        //         if (request.status === 200) {
        //             resolve();
        //         } else {
        //             reject(request.status);
        //         }
        //     });
        //     request.open('POST', );
        //     request.setRequestHeader('Content-Type', 'application/json'); //'multipart/form-data'

        //     request.send(JSON.stringify(body));
        // });
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
        .then((response) => {
            if (response.status === 200) {
                statusMessage.textContent = successMessage;
                loader.remove();
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                throw new Error('status network not 200');
            }
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

export default sendForm;