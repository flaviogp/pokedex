const pokemonImage = document.querySelector('.pokemon_image')
const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')

const form = document.querySelector('.form');
const input = document.querySelector('.search');

let pokemonId = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(apiResponse.status !== 200) return;
    const data = await apiResponse.json();
    return data;
}

// gifs funcionando até 649
const renderPokemon = async (pokemon) => {
    const data =  await fetchPokemon(pokemon);
    if(!data){ 
        input.value = '';
        input.placeholder = 'Pokemon nao existe'
        return;
    }
    const name = data.name;
    const id = data.id;
    const img = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage.src = img;
    pokemonName.innerText = name;
    pokemonNumber.innerText = id;
    pokemonId = id; 
}

form.addEventListener('submit',async (e) =>{
    e.preventDefault();
    const pokemon = input.value;
    await renderPokemon(pokemon.toLowerCase());
    input.value = '';
});

document.addEventListener('click', async (e) =>{
    const el = e.target;
    
    if(el.classList.contains('btn-prev')){ 
        if(pokemonId <= 1) return;   
        await renderPokemon(pokemonId -= 1);
    }
    if(el.classList.contains('btn-next')) await renderPokemon(pokemonId += 1);

});

renderPokemon(pokemonId);
