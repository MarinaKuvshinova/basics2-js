document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const selectFromCurrentcy = document.getElementById('converter-form-select'),
        selectToCurrentcy = document.getElementById('converter-to-select'),
        inputFromCurrentcy = document.getElementById('converter-form-input'),
        inputToCurrentcy = document.getElementById('converter-to-input'),
        buttonCurrentcy = document.getElementById('converter-button'),
        buttonCurrentcyRevers = document.getElementById('converter-revers');
        let value = [];

    const convertValue = (data) => {
        const optionCurrentcyFrom = selectFromCurrentcy.value,
            optionCurrentcyTo = selectToCurrentcy.value,
            inputFromValue = +inputFromCurrentcy.value,
            valueFrom = optionCurrentcyFrom !== 'EUR' ? data[optionCurrentcyFrom] : 1,
            valueTo = optionCurrentcyTo !== 'EUR' ? data[optionCurrentcyTo] : 1;
        
        inputToCurrentcy.value = (inputFromValue / valueFrom * valueTo).toFixed(2);
    };

    const getData = () => {
        fetch('http://api.exchangeratesapi.io/v1/'+
        'latest?access_key=6f7c8c02a954c78428e6f05318d3b0bc&symbols=USD,RUB&format=1')
            .then(response => {
                return response.json();
            })
            .then((data) => {
                return data.rates;
            })
            .then((data) => {
                convertValue(data);
            })
            .catch(error => console.warn(error)); 
    };

    buttonCurrentcy.addEventListener('click', e => {
        try {
            e.preventDefault();
            if(!(/^([0-9]*[.]?[0-9]*)$/g.test(inputFromCurrentcy.value))) {
                alert('Введите корректную сумму');
                inputFromCurrentcy.value = '';
                return true;
            }
            getData();
        } catch (error) {
            console.error(error);
        }
    });

    inputFromCurrentcy.addEventListener('focus', e => e.target.value = '');

    buttonCurrentcyRevers.addEventListener('click', e => {
        e.preventDefault();
        const inputFrom = inputFromCurrentcy.value,
            inputTo = inputToCurrentcy.value,
            selectFrom = selectFromCurrentcy.selectedIndex,
            selectTo = selectToCurrentcy.selectedIndex;

        let buf = inputFrom;
        inputFromCurrentcy.value = inputTo;
        inputToCurrentcy.value = buf;

        buf = selectFrom;
        selectFromCurrentcy.selectedIndex = selectTo;
        selectToCurrentcy.selectedIndex = buf;

    });
});