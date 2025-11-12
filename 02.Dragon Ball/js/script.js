const charactersContainer = document.getElementById("characters");
const favoritesContainer = document.getElementById("favorites");
const loadBtn = document.getElementById("loadBtn");
const searchInput = document.getElementById("searchInput");

const url = "https://dragonball-api.com/api/characters";

loadBtn.addEventListener('click', () => {
    fetch(url)
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
        console.log(item);
        const { id, name, ki, maxKi, race, gender, affiliation, image } = item;
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="container_img">
                <img src="${image}" alt="${name}" class="img_character">
            </div>
            <div class="container_info">
                <h3 class="info_white">${name}</h3>
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
}

const addFavorite = () => {
    console.log('hola')
}