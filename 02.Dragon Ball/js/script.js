const charactersContainer = document.getElementById("characters");
const favoritesContainer = document.getElementById("favorites");
const searchInput = document.getElementById("searchInput");
const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");

let currentUrl = "https://dragonball-api.com/api/characters";

let characters = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const loadCharacters = (url) => {
    fetch(`${url}`)
    .then(response => {
        if(!response.ok) {
            throw new Error('Error al obtener datos de la API')
        }
        return response.json();
    })
    .then(data => {
        characters = data.items || data; // hay que poner || data para que funcione el buscador.

        /* si no pongo esto, al buscar un personaje links no existe y da error, 
        añado charactersContainer para que la paginación solo esté en la home y no en favoritos */
        if(data.items && data.links && charactersContainer) {
            updatePagination(data.links.next, data.links.previous)
        }
        if(charactersContainer) renderCharFavs(characters, charactersContainer)
        if(favoritesContainer) renderCharFavs(favorites, favoritesContainer)
    }) 
    .catch (err => console.log("Error al cargar: ", err))
}

loadCharacters(currentUrl);

const renderCharFavs = (charactersList, container) => {
    container.innerHTML = '';
    if(!charactersList) return;


    charactersList.forEach(character => {
        const { id, name, ki, maxKi, race, gender, affiliation, image } = character;
        const card = document.createElement("div");
        card.className = "card";

        // Añadirle la clase card_favorite si ya está marcado como favorito.
        if(favorites.some(fav => fav.id === character.id)) {
            card.classList.add('card_favorite');
        }
        card.innerHTML = `
            <div class="container_img">
                <img src="${image}" alt="${name}" class="img_character">
            </div>
            <div class="container_info">
                <h3>${name}</h3>
                <span class="info_orange">${race} - ${gender}</span>
                <span class="info_white">Base KI:</span>
                <span class="info_orange">${ki}</span>
                <span class="info_white">Total KI:</span>
                <span class="info_orange">${maxKi}</span>
                <span class="info_white">Afilliation</span>
                <span class="info_orange">${affiliation}</span>
            </div>
        `;
        card.addEventListener('click', () => {
            card.classList.toggle('card_favorite');
            toggleFavorite(id);
        })
        container.appendChild(card);
    });
}

const toggleFavorite = (id) => {
    const exists = favorites.some(f => f.id === id);

    if(exists) {
        favorites = [...favorites.filter(f => f.id !== id)]; 
        /*Se podría usar sin el spread operator, pero lo usamos para explicar que así creamos un nuevo array, 
        no modificamos el existente, esto es muy importante para React, estados, inmutabilidad..etc */
    } else {
        const found = characters.find(c => c.id === id);
        favorites = [...favorites, found] 
        /* Se podría usar directamente un push, pero la idea es usar el spread operator para que lo vean, así
        copiamos el array actual, añadimos el nuevo personaje al final y creamos un array nuevo */
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    if(favoritesContainer) {
        renderCharFavs(favorites, favoritesContainer)
    }
}

//Buscador, tanto en la home como en favoritos.
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim().toLowerCase();

        if(charactersContainer) {
            if(term === "") {
                loadCharacters(currentUrl);
            } else {
                loadCharacters(`https://dragonball-api.com/api/characters?name=${term}`)
            }
        }

        if(favoritesContainer) {
            const filtered = favorites.filter(f => f.name.toLowerCase().includes(term));
            renderCharFavs(filtered, favoritesContainer)
        }

    })
}

const updatePagination = (next, prev) => {
    btn_next.dataset.url = next;
    btn_prev.dataset.url = prev;
}

if(charactersContainer) {
    btn_next.addEventListener('click', () => {
        const nextUrl = btn_next.dataset.url;
        if(nextUrl) loadCharacters(nextUrl)
    })

    btn_prev.addEventListener('click', () => {
        const prevUrl = btn_prev.dataset.url;
        if(prevUrl) loadCharacters(prevUrl)
    })
}




