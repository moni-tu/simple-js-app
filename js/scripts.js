let pokemonRepository = (function () {
  let pokemonList = [];
  //API link
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
  
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class", "btn", "btn-primary", "btn-lg");
    // the following two lines maanage data-* attributes is by using dataset.
    // overall the button in HTML would look like: 
    //<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Pokemon name </button>
    button.setAttribute("data-target", "#exampleModal");
    button.setAttribute("data-toggle", "modal");
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  
  // Load list of pokemon without details
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

  // Load list of pokemons with details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = [];
        for (var i = 0; i < details.types.lenght; i++) {
          item.types.push(details.types[i].type.name);
        }
      item.abilities = [];
        for (var i = 0; i < details.abilities.lenght; i++) {
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
  };

})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
})