const API = "https://pokeapi.co/api/v2/pokemon/"
const IMAGE_PRFIX = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
const MIN_POKEMON = 1
const MAX_POKEMON = 1000
let pokemon
const name_h1 = document.querySelector('#name')
const sprite_img = document.querySelector('#sprite')

function getRandomInt() {
    return Math.floor(
        Math.random()
        * (MAX_POKEMON - MIN_POKEMON + 1)
        + MIN_POKEMON)
}

async function getRandomPokemon() {
    pokemon = await fetch(`${API}${getRandomInt()}`)
        .then(res => res.json())
        .then((data) => {
            return data
        })
    // console.log('getRandomPokemon', pokemon)
}

async function writeData() {
    await getRandomPokemon()
    if (pokemon) {
        // console.log('writeData', pokemon)
        name_h1.textContent = pokemon.id + ' ' + pokemon?.name.replace(/\b\w/g, l => l.toUpperCase())
        sprite_img.setAttribute("src", `${IMAGE_PRFIX}${pokemon.id}.png`);
        sprite_img.setAttribute("alt", pokemon.name);
    }
}

// console.log(getRandomInt())
writeData()

