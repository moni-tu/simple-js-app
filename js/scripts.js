let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.classList.add("btn", "btn-primary", "btn-lg");
    // the following two lines maanage data-* attributes is by using dataset.
    // overall the button in HTML would look like: 
    //<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Pokemon name </button>
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    listpokemon.classList.add("group-list-item");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

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
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // details of a pokemon in a modal
  function showModal(item) {
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeader = document.querySelector(".modal-header");
    
    // empty modal title and body because if you load many pokemons in a row,
    // these info can overlap. Explicitly re-set them.
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    //create element for name in modal content
    let nameElement = document.createElement("h5");
    nameElement.innerHTML = pokemon.name;
    let pokemonPicture = document.createElement("img");
    pokemonPicture.src = item.imageUrl; 
    let heightElement = document.createElement("p"); 
    heightElement.innerHTML = 'Height: ' + item.height;
    let weightElement = document.createElement("p"); 
    weightElement.innerHTML = 'Weight: ' + item.weight;
    let typesElement = document.createElement("p");
    typesElement.innerHTML = 'Types: ' + item.types; 
    let abilitiesElement = document.createElement("p"); 
    abilitiesElement.innerHTML = 'Abilities: ' + item.abilities;
    
    modalTitle.append(nameElement);
    modalBody.append(imageUrl);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    
  }

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
    hideModal: hideModal
  };

})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
})