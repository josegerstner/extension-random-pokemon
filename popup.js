const API = "https://pokeapi.co/api/v2/pokemon/"
const IMAGE_PREFIX = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
const MIN_POKEMON = 1
const MAX_POKEMON = 1010
let pokemon
const name_h1 = document.querySelector('#name')
const sprite_img = document.querySelector('#sprite')
const boton = document.querySelector('#next')

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

const isShiny = () => {
    const isIt = 1 == Math.floor((Math.random()*20 + 1))
    if(isIt) name_h1.classList.add("shiny");
    return isIt
}

async function writeData() {
    await getRandomPokemon()
    if (pokemon) {
        // console.log('writeData', pokemon)
        name_h1.textContent = pokemon.id + ' ' + pokemon?.name.replace(/\b\w/g, l => l.toUpperCase())
        sprite_img.setAttribute("src", `${IMAGE_PREFIX}${isShiny()?'shiny/':''}${pokemon.id}.png`);
        sprite_img.setAttribute("alt", pokemon.name);
    }
}

boton.addEventListener('click', () => {
    name_h1.classList.remove("shiny");
    writeData()
})

// console.log(getRandomInt())
writeData()

