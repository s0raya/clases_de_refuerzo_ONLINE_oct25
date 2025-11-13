const charactersContainer = document.getElementById("characters");
const favoritesContainer = document.getElementById("favorites");
const loadBtn = document.getElementById("loadBtn");
const searchInput = document.getElementById("searchInput");

const url = "https://dragonball-api.com/api/characters";

let characters = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

loadBtn.addEventListener('click', () => {
    fetch(`${url}/?page=5&limit=10`)
    .then(response => {
        if(!response.ok) {
            throw new Error('La consulta no se ha podido realizar')
        }
        return response.json();
    })
    .then(data => {
        const { items } = data;
        characters = items;
        renderCharacters(characters)
    }) 
    .catch (err => console.log("Error al cargar: ", err))
})

const renderCharacters = (characters) => {
    charactersContainer.innerHTML = '';
    characters.forEach(item => {
        const { id, name, ki, maxKi, race, gender, affiliation, image } = item;
        const card = document.createElement("div");
        card.className = "card";
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
        card.addEventListener("click", () => addFavorite(id));
        charactersContainer.appendChild(card);
    });
    renderFavorites();
}

const addFavorite = (id) => {
    const found = characters.find(char => char.id === id);
    if(!favorites.find(f => f.id === id)) {
        favorites = [...favorites, found];
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
    }
}

const renderFavorites = () => {
    favoritesContainer.innerHTML = '';
    favorites.forEach(fav => {
        const { id, name, ki, maxKi, race, gender, affiliation, image} = fav;
        const card = document.createElement("div");
        card.className = "card";
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
        card.addEventListener("click", () => removeFavorite(id));
        favoritesContainer.appendChild(card);
    })
}

const removeFavorite = (id) => {
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}

searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = characters.filter(c => c.name.toLowerCase().includes(term));
    renderCharacters(filtered);
})