let pokemonRepository=function(){let t=[],e="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(e){"object"==typeof e&&"name"in e?t.push(e):console.log("pokemon is not correct")}function i(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrlFront=e.sprites.front_default,t.imageUrlBack=e.sprites.back_default,t.weight=e.weight,t.height=e.height,t.types=[];for(var n=0;n<e.types.length;n++)t.types.push(e.types[n].type.name);t.abilities=[];for(n=0;n<e.abilities.length;n++)t.abilities.push(e.abilities[n].ability.name)}).catch(function(t){console.error(t)})}function o(t){i(t).then(function(){l(t)})}function l(t){let e=$(".modal-body"),n=$(".modal-title");e.empty(),n.empty();let i=$("<h1>"+t.name+"</h1>"),o=$('<img class="modal-img" style="width:50%">');o.attr("src",t.imageUrlFront);let l=$('<img class="modal-img" style="width:50%">');l.attr("src",t.imageUrlBack);let a=$("<p>height : "+t.height+"</p>"),s=$("<p>weight : "+t.weight+"</p>"),r=$("<p>types : "+t.types+"</p>"),p=$("<p>abilities : "+t.abilities+"</p>");n.append(i),e.append(o),e.append(l),e.append(a),e.append(s),e.append(r),e.append(p)}let a=document.querySelector("#searchbar");return a.addEventListener("input",()=>{let t=a.value.toLowerCase();document.querySelectorAll("li").forEach(e=>{e.innerText.toLowerCase().includes(t)?e.style.display="block":e.style.display="none"})}),{add:n,getAll:function(){return t},addListItem:function(t){let e=document.querySelector(".list-group"),n=document.createElement("li");n.classList.add("list-group-item");let i=document.createElement("button");i.innerText=t.name,i.classList.add("button-class","btn","btn-primary","btn-lg"),i.setAttribute("data-target","#exampleModal"),i.setAttribute("data-toggle","modal"),i.addEventListener("click",function(){o(t)}),n.appendChild(i),e.appendChild(n)},loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){n({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:i,showDetails:o,showModal:l}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});