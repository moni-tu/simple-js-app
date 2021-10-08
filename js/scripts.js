let pokemonList = [
    {name:'bulbasaur', height:0.7, type: ['grass','poison']},
    {name:'charmender', height:0.6, type: ['fire']},
    {name:'squirtle', height:0.5, type: ['water']},
    {name:'jigglipuff', height:0.5, type: ['fairy', 'normal']},
    {name:'gastly', height:1.3, type: ['ghost','poison']}
]

for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height>1.0){
        document.write(pokemonList[i].name + 'height ' + pokemonList[i].height + 'Your Pokemon is big!');
    } else if (pokemonList[i].height<1.0 && pokemonList[i].height>0.2){
        document.write(pokemonList[i].name + 'height ' + pokemonList[i].height);
    } else {
        document.write(pokemonList[i].name + 'height ' + pokemonList[i].height + 'Your Pokemon is small!');
    }
     
}


 