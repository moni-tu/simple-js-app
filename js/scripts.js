let pokemonRepository = (function() {
    let pokemonList = [
    {name:'Bulbasaur', height:0.7, type: ['grass','poison']},
    {name:'Charmender', height:0.6, type: ['fire']},
    {name:'Diglett', height:0.2, type: ['earth']},
    {name:'Jigglipuff', height:0.5, type: ['fairy', 'normal']},
    {name:'Gastly', height:1.3, type: ['ghost','poison']}
    ];

    return {
        getAll: function() {
            return pokemonList;
        },
        add: function(pokemon) {
            pokemonList.push(pokemon);
        }
    };

})();

document.write(pokemonRepository.getAll());
pokemonRepository.add({name: 'Psyduck', height: 0.8});
console.log(pokemonRepository.getAll());

pokemonRepository.forEach(function(pokemon) {
    console.log(pokemon.name + ', height: ' + pokemon.height + ', type: ' + pokemon.type);
});

for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height>1.0){
        document.write(pokemonList[i].name + ' (height ' + pokemonList[i].height + ') Your Pokemon is big!');
        document.write('<br>')
    } else if (pokemonList[i].height<1.0 && pokemonList[i].height>0.2){
        document.write(pokemonList[i].name + ' (height ' + pokemonList[i].height + ')');
        document.write('<br>')
    } else {
        document.write(pokemonList[i].name + ' (height ' + pokemonList[i].height + ') Your Pokemon is small!');
        document.write('<br>')
    }
     
}
