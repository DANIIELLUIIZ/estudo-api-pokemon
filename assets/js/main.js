const loadMoreBtn = document.getElementById('loadMoreBtn')
const pokemonList = document.getElementById('pokemonList')
const moreInfoBtn = document.querySelector('.more-info-btn')
const closeInfoBtn = document.querySelector('.close-info-btn')
const pokeCard = document.querySelectorAll('.pokemons li')
const curtain = document.querySelector('.curtain')

let limit = 5
let offset = 0

loadPokemonItens(offset, limit)

function createPokemonList(pokemon) {
  return `
  <li class="pokemon-info ${pokemon.type}" >
  <div>
  <div class="info">
  <span class="name">${pokemon.name}</span>
  <span class="number ${pokemon.type}">#${pokemon.number}</span>
    </div>
      <div class="pokemon">
  <div class="types">
  ${pokemon.types
    .map(type => ` <span class="type ${type}">${type}</span>`)
    .join('')}
  </div>
  <div class="img">
  <img
    src="${pokemon.photo}"
    alt="${pokemon.name}"
  />
  </div>
 
</div>

</div>

<div class="more-info">
<button class="more-info-btn">
<i class="fa-solid fa-angle-down"></i>
<i class="fa-solid fa-angle-up hide"></i>
</button>

<div class="status-container hide">
<div class="status">
  <span class="status-name"> HP</span>
  <span class="value">${pokemon.hp}</span>
</div>
<div class="status">
  <span class="status-name">ATK</span>
  <span class="value">${pokemon.atk}</span>
</div>
<div class="status">
  <span class="status-name">DEF</span>
  <span class="value">${pokemon.def}</span>
</div>
<div class="status">
  <span class="status-name">PESO</span>
  <span class="value">${pokemon.weight}</span>
</div>
</div>
</div>
</li> 

`
}
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(createPokemonList).join('')
    pokemonList.innerHTML = newHtml
  })
}
function openPokemonInfo(e) {
  let btn = e.target
  let close = btn.closest('div')
  let closeList = btn.closest('li')
  let infoContainer = close.children[1]
  if (infoContainer.classList.contains('status-container')) {
    infoContainer.classList.toggle('hide')
    closeList.classList.toggle('absolute')
    curtain.classList.toggle('hide')
  }
}

loadMoreBtn.addEventListener('click', () => {
  limit += limit

  loadPokemonItens(offset, limit)
})

document.addEventListener('click', e => {
  openPokemonInfo(e)
})
