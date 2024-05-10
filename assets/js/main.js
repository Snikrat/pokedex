// Seleciona elementos do DOM
const pokemonList = document.getElementById('pokemonList'); // Lista de Pokémon
const loadMoreButton = document.getElementById('loadMoreButton'); // Botão para carregar mais Pokémon

// Define limite e offset para controlar a quantidade de Pokémon carregados e sua posição na lista
const limit = 5;
let offset = 0;

// Função para carregar itens de Pokémon com base no offset e no limite
function loadPokemonsItens(offset, limit) {
    // Chamada para a API para obter uma lista de Pokémon com base no offset e no limite
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Gera HTML para cada Pokémon retornado pela API
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');
        
        // Adiciona o HTML gerado à lista de Pokémon no DOM
        pokemonList.innerHTML += newHtml;
    });
}

// Carrega inicialmente os primeiros Pokémon
loadPokemonsItens(offset, limit);

// Adiciona um evento de clique ao botão "loadMoreButton" para carregar mais Pokémon
loadMoreButton.addEventListener('click', () => {
    // Incrementa o offset para carregar a próxima página de Pokémon
    offset += limit;
    // Chama a função para carregar mais Pokémon com o novo offset
    loadPokemonsItens(offset, limit);
});
