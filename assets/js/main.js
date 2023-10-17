const loadMoreBtn = document.getElementById('loadMoreBtn')
const pokemonList = document.getElementById('pokemonList')
const moreInfoBtn = document.querySelector('.more-info-btn')
const curtain = document.querySelector('.curtain')

let limit = 1
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

loadMoreBtn.addEventListener('click', () => {
  limit += 5

  loadPokemonItens(offset, limit)
})

document.addEventListener('click', e => {
  let btn = e.target
  let close = btn.closest('div')
  let closeList = btn.closest('li')
  let infoContainer = close.children[1]
  if (infoContainer.classList.contains('status-container')) {
    infoContainer.classList.toggle('hide')
    closeList.classList.toggle('absolute')
    curtain.classList.toggle('curtain-abso')
  }
})
