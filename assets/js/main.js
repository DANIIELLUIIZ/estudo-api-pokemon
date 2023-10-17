const loadMoreBtn = document.getElementById('loadMoreBtn')
const pokemonList = document.getElementById('pokemonList')

let limit = 5
let offset = 0

function createPokemonList(pokemon) {
  return `
  <li class="pokemon-info ${pokemon.type}" ><div class="info">
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
</li> `
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(createPokemonList).join('')
    pokemonList.innerHTML = newHtml
  })
}
loadPokemonItens(offset, limit)

loadMoreBtn.addEventListener('click', () => {
  limit += 5

  loadPokemonItens(offset, limit)
})
