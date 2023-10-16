const pokemonList = document.getElementById('pokemonList')

function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes.map(
    typeSlot => ` <span class="type">${typeSlot.type.name}</span>`
  )
}
function createPokemonList(pokemon) {
  return `<li class="pokemon-info" ><div class="info">
      <span class="name">${pokemon.name}</span>
      <span class="number">${pokemon.order}</span>
    </div>
    <div class="pokemon">
      <div class="types">
       ${convertPokemonTypesToLi(pokemon.types).join('')}
      </div>
      <div class="img">
      <img
        src="${pokemon.sprites.other.dream_world.front_default}"
        alt="${pokemon.name}"
      />
      </div>
    </div>
    </li>
    `
}

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(createPokemonList).join('')
})
