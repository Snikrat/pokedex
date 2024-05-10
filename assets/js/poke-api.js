// Definição do objeto pokeApi
const pokeApi = {};

// Função para converter detalhes da API de Pokémon em objetos de Pokémon
function convertPokeApiDetailToPokemon(pokeDetail) {
    // Cria um novo objeto Pokémon
    const pokemon = new Pokemon();
    // Define o número e o nome do Pokémon com base nos detalhes fornecidos pela API
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    // Extrai os tipos do Pokémon dos detalhes da API
    const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name);
    // Seleciona o primeiro tipo do Pokémon
    const [type] = types;

    // Define os tipos e o tipo principal do Pokémon no objeto
    pokemon.types = types;
    pokemon.type = type;

    // Define a foto do Pokémon usando a imagem da API
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    // Retorna o objeto Pokémon resultante
    return pokemon;
}

// Método para obter detalhes de um Pokémon específico da API
pokeApi.getPokemonDetails = (pokemon) => {
    // Realiza uma solicitação de busca ao servidor da API para obter detalhes do Pokémon
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon); // Converte os detalhes obtidos para um objeto Pokémon
}

// Método para obter uma lista de Pokémon da API
pokeApi.getPokemons = (offset = 0, limit = 20) => {
    // Constrói a URL com base no offset e no limite fornecidos
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    // Realiza uma solicitação de busca ao servidor da API para obter a lista de Pokémon
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results) // Extrai os resultados da resposta JSON
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails)) // Mapeia cada Pokémon para obter seus detalhes
        .then((detailsRequest) => Promise.all(detailsRequest)) // Espera todas as solicitações de detalhes serem concluídas
        .then((PokemonsDetails) => PokemonsDetails); // Retorna os detalhes dos Pokémon
}
