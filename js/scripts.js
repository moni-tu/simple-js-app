let pokemonRepository = (function() {
    let pokemonList = [
    {name:'Bulbasaur', height:0.7, type: ['grass','poison']},
    {name:'Charmender', height:0.6, type: ['fire']},
    {name:'Diglett', height:0.2, type: ['earth']},
    {name:'Jigglipuff', height:0.5, type: ['fairy', 'normal']},
    {name:'Gastly', height:1.3, type: ['ghost','poison']}
    ];

    let apiUrl= "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function getAll() {
        return pokemonList;
    }
  
    function add(pokemon){
        pokemonList.psush(pokemon);
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

    function showDetails(pokemon) {
        console.log(pokemon.name);
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

    return {
        getAll,
        add,
        addListItem,   
        loadlist,
    };

})();

pokemonRepository.loadlist().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });




