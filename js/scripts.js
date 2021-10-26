let pokemonRepository = (function() {
    let pokemonList = [];

    let apiUrl= "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function getAll() {
        return pokemonList;
    }
  
    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let unorderedList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('poke-button');
        //the button is only virtually present. you have to append it to an element on the page
        //so to make it present on the page. = CSSclass.appendChild(button)
        listItem.appendChild(button);
        unorderedList.appendChild(listItem);

        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function loadlist() {
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.foreach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url= item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function()
        {
        console.log(item);
        });  
    }

    return {
        getAll,
        add,
        addListItem,   
        loadlist,
        loadDetails,
        showDetails
        
    };

})();

pokemonRepository.loadlist().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});





