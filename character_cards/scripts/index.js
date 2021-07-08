'use strict';

let character = [];

//get date from json
const getDate = async (url = '') => {
    try {
        if (!url) {
            throw new Error('Укажите url запроса');
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ответ сети был не ok.');
        }
        const date = await response.json();
        return date;
      } catch (error) {
        console.log('Возникла проблема с вашим fetch запросом: ', error.message);
      }
};

//render list cart
const render = (data, flag = null) => {
    const characterList = document.querySelector('.character__list');

    const renderMovies = (movies) => {
        const ul = document.createElement('ul');
        
        [...movies].forEach(elem => {
            const li = document.createElement('li');
            
            li.textContent = elem;
            ul.appendChild(li);
        });
        return ul.outerHTML;
    };

    const renderPhoto = (photo) => {
        return photo.slice(-1) === '/' ? photo.slice(0, -1) : photo;
    };

    const createCart = (elem) => {
        const li = document.createElement('li');
        
            li.innerHTML = `
            <div class="shadow">
                <span></span><span></span><span></span><span></span>
            </div>
            <div class="front">
                <img src="./dbHeroes-master/${elem.photo ? renderPhoto(elem.photo) : 'none.png'}" alt="${elem.name}">
                <h2 class="name">${elem.name}<span class="status">${elem.status ? elem.status : ''}</span></h2>
                <ul class="live">
                    <li>
                        <span>birthDay</span>
                        <span>${elem.birthDay ? elem.birthDay : '-'}</span>
                    </li>
                    <li>
                        <span>deathDay</span>
                        <span>${elem.birthDay ? elem.birthDay : '-'}</span>
                    </li>
                </ul>
            </div>
            <div class="back">
                <div class="cart__content">
                    <h2>Characteristics</h2>
                    <dl>
                        <dt>RealName</dt>
                        <dd>${elem.realName ? elem.realName : '-'}</dd>
                        <dt>Gender</dt>
                        <dd>${elem.gender ? elem.gender : '-'}</dd>
                        <dt>Species</dt>
                        <dd>${elem.species ? elem.species : '-'}</dd>
                        <dt>Citizenship</dt>
                        <dd>${elem.citizenship ? elem.citizenship : '-'}</dd>
                        <dt>Actors</dt>
                        <dd>${elem.actors ? elem.actors : '-'}</dd>
                        <dt>Movies</dt>
                        <dd>
                            ${elem.movies ? renderMovies(elem.movies) : '-'}
                        </dd>
                    </dl>
                </div>
            </div>
        `;
        return li;
    };

    characterList.textContent = '';

    if (flag === 'movies') {
        //render view filter movies
        data.forEach(elem => {
            const ul = document.createElement('ul');
            //created list cart for single movie
            elem.characters.forEach(character => {
                const carts = createCart(character);
                ul.appendChild(carts);
            });
            const li = document.createElement('li');
            li.className = 'movie-row';
            li.innerHTML = `
                <h2 class="movie-title">${elem.movie}</h2>
            `;
            li.appendChild(ul);
            characterList.appendChild(li);
        });
        characterList.classList.add('movies-list');

    } else {
        data.forEach(elem => {
            const li = createCart(elem);
            characterList.appendChild(li);
        });
        characterList.classList.remove('movies-list');
    }

};

//filtered cart
const filter = () => {
    const filter = document.getElementById('filter');

    let filterResult;

    const filtered = (input) => {
        const filteredMovies = () => {
            //search characters in movie 
            const searchCharacter = (movieSearch) => {
                let characterArray = [];
                character.forEach(cart => {
                    if (cart.movies) {
                        cart.movies.forEach(movie => {
                            if (movie === movieSearch) {
                                characterArray.push(cart);
                            }
                        });
                    }
                });

                return characterArray;
            };

            let filterMoviesResult = [];
            character.forEach( elem => {
                if (elem.movies) {
                    elem.movies.forEach( movieFilter => {
                        //add new film in array result
                        if (!filterMoviesResult.find(elem => elem.movie === movieFilter)) {
                            filterMoviesResult.push({
                                movie: movieFilter,
                                characters: searchCharacter(movieFilter)
                            });
                        }
                    });
                }
            });

            return filterMoviesResult;
        };

        const filterBy = input.dataset.filter,
            filterValue = input.id;

        if (filterValue === 'all') {
            render(character);
        } else if (filterValue === 'movies') {
            render(filteredMovies(), 'movies');
        } else {
            filterResult = character.filter(elem => elem[filterBy] === filterValue);
            render(filterResult);
        }
    };

    filter.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('li')) {
            target.id ? filtered(target) : '';
        }
    });
};

//init project
const init = () => {
    getDate('./dbHeroes-master/dbHeroes.json')
    .then((data) => {
        character = Array.from(data);
        render(data);
        filter();
    });
};

init();


