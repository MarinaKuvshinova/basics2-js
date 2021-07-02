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

export default validate;