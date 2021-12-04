let pokemonRepository = (function () {
  let pokemonList = [];
  //API link
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }
  
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('poke-list');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('poke-button');
    // the following two lines maanage data-* attributes is by using dataset.
    // overall the button in HTML would look like: 
    //<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Pokemon name </button>
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  
  // Scroll up button
  let scrollButton = document.getElementById('btn-to-top');
  scrollButton.addEventListener('click', toTop);
  function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
  // Load list of pokemons without details
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
        console.error(e);
    })
  }

  // Load list of pokemons with details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.weight = details.weight;
      item.height = details.height;
      item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      item.abilities = [];
        // eslint-disable-next-line no-redeclare
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Show pokemon details
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  // Show modal
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    
    // empty modal title and body 
    modalBody.empty();
    modalTitle.empty();

    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);
    let heightElement = $('<p>' + 'height : ' + item.height + '</p>');
    let weightElement = $('<p>' + 'weight : ' + item.weight + '</p>');
    let typesElement = $('<p>' + 'types : ' + item.types + '</p>');
    let abilitiesElement = $('<p>' + 'abilities : ' + item.abilities + '</p>');
    
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  // search pokemon name in nav bar
  let searchPokemon = document.querySelector('#searchbar');
  searchPokemon.addEventListener('input', () =>{
      let value = searchPokemon.value.toLowerCase();
      let pokemonList = document.querySelectorAll('li');
      pokemonList.forEach((pokemon) =>{
          if(pokemon.innerText.toLowerCase().includes(value))
              pokemon.style.display = 'block';
          else
              pokemon.style.display = 'none';
      })
  });

  function getAll() {
      return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };

})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
})