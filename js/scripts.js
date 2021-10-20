let pokemonRepository = (function() {
    let pokemonList = [
    {name:'Bulbasaur', height:0.7, type: ['grass','poison']},
    {name:'Charmender', height:0.6, type: ['fire']},
    {name:'Diglett', height:0.2, type: ['earth']},
    {name:'Jigglipuff', height:0.5, type: ['fairy', 'normal']},
    {name:'Gastly', height:1.3, type: ['ghost','poison']}
    ];

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
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem, 
    };


})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });




