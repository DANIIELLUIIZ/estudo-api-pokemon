const pokemonList = document.getElementById('pokemonList')

function createPokemonList(pokemon) {
  return `<li class="pokemon-info ${pokemon.type}" ><div class="info">
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
    </li>
    `
}

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(createPokemonList).join('')
})
