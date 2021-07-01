document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = () => {
        return new Promise( (resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                setTimeout(() => {
                    if (request.readyState === 4 && request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        resolve(data);
                    } else {
                        reject(request.statusText);
                    }
                },0);
            });
        });
    };

    
    select.addEventListener('change', () => {
        try {
            getData().then((data) => {
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                });
            })
            .catch(error => {
                console.warn(error);
                output.innerHTML = 'Произошла ошибка';
            });
        } catch (e) {
            console.error(e);
        }
    });

        

});