const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.order
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  pokemon.hp = pokeDetail.stats[0].base_stat
  pokemon.atk = pokeDetail.stats[1].base_stat
  pokemon.def = pokeDetail.stats[2].base_stat
  pokemon.weight = pokeDetail.weight
  return pokemon
}

pokeApi.getPokemonsDetail = pokemon => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(pokemon => convertPokeApiDetailToPokemon(pokemon))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offeset=${offset}&limit=${limit}`
  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonsDetail))
    .then(detailRequest => Promise.all(detailRequest))
    .then(pokemonsDetails => pokemonsDetails)
}
