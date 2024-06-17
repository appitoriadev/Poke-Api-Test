// Ahora que tenemos nuestro HTML y CSS, es hora de darle vida con JavaScript <3

// 1️⃣. Seleccionar los elementos HTML que vamos a utilizar:
// - Imagen de los pokemon
// - Stats de cada uno
// 🤓 Pista: revisa el método document.querySelector()

// Selectores para el Pokemon 1
let poke1Img = document.querySelector('.pokemon-1__img');
let poke1Name = document.querySelector('.pokemon-1__name');
let poke1HP = document.querySelector('.pokemon-1__hp');
let poke1Attack = document.querySelector('.pokemon-1__attack');
let poke1Defense = document.querySelector('.pokemon-1__defense');
let poke1Type = document.querySelector('.pokemon-1__type');

// Selectores para el Pokemon 2
let poke2Img = document.querySelector('.pokemon-2__img');
let poke2Name = document.querySelector('.pokemon-2__name');
let poke2HP = document.querySelector('.pokemon-2__hp');
let poke2Attack = document.querySelector('.pokemon-2__attack');
let poke2Defense = document.querySelector('.pokemon-2__defense');
let poke2Type = document.querySelector('.pokemon-2__type');

// 2️⃣. Miremos ahora la API de Pokemon :)
// - Haz un llamado a la URL https://pokeapi.co/api/v2/pokemon/ y analiza cómo devuelve su respuesta
// La API retorna un pokemon https://pokeapi.co/api/v2/pokemon/{ID} si se provee un ID al final.
// 🤓 Pista: Para enfrentar 2 pokemones aleatorios, necesitamos hacer 2 llamados a la API 
// con 2 n´¨úmeros aleatorios entre el 1 y el 900


// 3️⃣ - Crear una función que genere un número random entre 1 y 900.
// Puedes usar esta: 👩🏻‍💻
const getRandomNumber = (numMin, numMax) => {
  return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
};

// function getRandomNumber(numMin, numMax){  
//   return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
// }

// 4️⃣ - Asignar un número random al ID de los que serán nuestros pokemons
// Declara 2 variables para cada pokemon y guarda los números que retorna la funci´øn en ellos
// debugger;
const poke1ID = getRandomNumber(1, 900);
const poke2ID = getRandomNumber(1, 900);

// 🤓 Pista: algo como ... const poke1ID = getRandomNumber(1, 900);

// 5️⃣ - Crear una función para traer (fetch) data de la API
// Dale una mirada a la función fetch -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Recuerda la URL de la API https://pokeapi.co/api/v2/pokemon/${pokeID}

//Puedes usar esta: 👩🏻‍💻
const getPokemon = async (pokeID) => {
  
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
  const data = await response.json();
  return data;
};

// 6️⃣ - Vamos a crear los pokemons en la función createPokemons.
// Primero Haz varias pruebas a las API para examinar bien qué devuelve, esa data
// será necesaria para popular nuestros elementos HTML
// 🤓 Pista: - Crea una función asíncrona que reciba los 2 ID de los pokemon, es decir los números que obtenemos de llamar la función random
//           - Haz una llamada a la API por cada pokemon, guarda los datos que te devuelve en dos variables: pokemon1 y pokemon2
//           - Toma los elementos HTML que seleccionamos más arriba y utiliza su propiendad innerHTML para añadir la info que necesitamos de la API

const createPokemons = async (poke1ID, poke2ID) => {
  const pokemon1 = await getPokemon(poke1ID);
  
  poke1Img.src = pokemon1.sprites.other["official-artwork"]["front_default"];
  poke1HP.innerHTML += pokemon1.stats[0].base_stat;
  poke1Name.innerHTML += pokemon1.name;
  poke1Attack.innerHTML += pokemon1.stats[1].base_stat;
  poke1Defense.innerHTML += pokemon1.stats[2].base_stat;
  poke1Type.innerHTML += pokemon1.types[0].type.name;

  const pokemon2 = await getPokemon(poke2ID);
  poke2Img.src = pokemon2.sprites.other["official-artwork"]["front_default"];
  poke2HP.innerHTML += pokemon2.stats[0].base_stat;
  poke2Name.innerHTML += pokemon2.name;
  poke2Attack.innerHTML += pokemon2.stats[1].base_stat;
  poke2Defense.innerHTML += pokemon2.stats[2].base_stat;
  poke2Type.innerHTML += pokemon2.types[0].type.name;

  console.log(pokemon1);
  console.log(pokemon2);
};

// 🎁 Bonus! - Vamos a crear la función fightPokemons que permitirá que los pokemons interactúen y peleen

  // 1. Seleccionar los datos que ahora tenemos en el HTML y que trajimos desde la API: para ambos 
  // pokemon: HP, attack, defense y name.

  const fightPokemons = () => {
    const poke1hp = parseInt(poke1HP.innerHTML);
    const poke1Attack = parseInt(poke1Attack.innerHTML);
    const poke1Defense = parseInt(poke1Defense.innerHTML);
    const poke1Name = poke1Name.innerHTML;

    const poke2hp = parseInt(poke2HP.innerHTML);
    const poke2Attack = parseInt(poke2Attack.innerHTML);
    const poke2Defense = parseInt(poke2Defense.innerHTML);
    const poke2Name = poke2Name.innerHTML;

    const modalText = document.querySelector(".modal__text");

  // 2. Crear una función que calcule el daño hecho a cada pokemon. Necesitamos el poder del atacante y la defensa y los HP del que defiende
  // - Calcular el daño restando el ataque de la defensa, con esto definimos si el pokemon sufrió daño.
  // - Calcular los nuevos HP: Si la defensa es menor a 0, significa que el ataque logró perforarla e hizo daño, en este caso vamos a restar el daño de los HP, si no, la HP debe quedar igual pues no hubo da˜ño
  // En esta función vamos a devolver la nueva HP del pokemon atacado y además el da˜ñó que sufrió. - Luego vamos a necesitar estos datos -
  const calcularDano = (ataque, defensa, hp) => {
    const damage = defensa - ataque;
    const newHP = damage < 0 ? hp + damage : hp;
    return [newHP, damage];
  };

  // 3. Narrar la batalla ;). 
  // Para esto vamos a usar el elemento modal__text, aquí vamos a ir llenando su innerHTML.
  // Empecemos con el Pokemon 1.
  
  modalText.innerHTML += `${poke1Name} ataca a ${poke2Name} con ${poke1Attack} puntos de ataque <br>`;

  // Ahora calculemos el daño que le hizo a pokemon2 y 
  // cuánta vida le queda, usemos la función de calcular daño

  const [poke2newHP, poke2DmgRecibido] = calcularDano(
    poke1Attack,
    poke2Defense,
    poke2hp
  );


  // Vamos a narrar qué pasó en este ataque.Si el pokemon 1 tiene un ataque mayor a la denfesa del pokemon 2, debemos narrar que logra perforar su defensa
  // y describir cuánto daño recibió y cuáles son ahora sus puntos de vida
  // Si el ataque del pokemon 1 no es mayor que la denfesa del pokemon 2, significa que no logra perforarla y por lo tanto no hay daño.
  if (poke1Attack > poke2Defense) {
    modalText.innerHTML += ` ${poke1Name} logra perforar la defensa de ${poke2Name} y recibe 
    ${Math.abs(poke2DmgRecibido)} puntos de daño <br> <br> Ahora el HP de ${poke2Name} es de 
    ${poke2newHP} <br> <br>`;
  } else {
    modalText.innerHTML += ` ${poke1Name}  no logra perforar la defensa de ${poke2Name} <br> <br>`;
  }
  
  // Ahora el Pokemon2, mismo procedimiento.
  modalText.innerHTML += `${poke2Name} ataca a ${poke1Name} con ${poke2Attack} puntos de ataque <br>`;

  const [poke1newHP, poke1DmgRecibido] = calcularDano(
    poke2Attack,
    poke1Defense,
    poke1hp
  );

  if (poke2Attack > poke1Defense) {
    modalText.innerHTML += ` ${poke2Name} logra perforar la defensa de ${poke1Name} y recibe 
    ${Math.abs(poke1DmgRecibido)} puntos de daño <br> <br> Ahora el HP de ${poke1Name} es de 
    ${poke1newHP} <br> <br>`;
  } else {
    modalText.innerHTML += ` ${poke2Name}  no logra perforar la defensa de ${poke1Name} <br> <br>`;
  }

  // Definamos el ganador que sería el más daño haya hecho al otro pokemon.
  // Recordemos que los puntos de daño son negativos!!
  // - Si el daño recibido por pokemon 2 es menor al de pokemon 1, (es decir un mayor número negativo), 
  // significa que pokemon 1 hizo más daño, por lo tanto es el gandor!
  // - En caso de que sea menor el daño de pokemon 1, significa que pokemon 2 es el gandor
  // - El último caso posible es que ambos hayan recibido el mismo daño, en ese caso sería un empate.
 
  if (poke2DmgRecibido < poke1DmgRecibido) {
    modalText.innerHTML += ` ${poke1Name} es el ganador!`;
  } else if (poke1DmgRecibido < poke2DmgRecibido) {
    modalText.innerHTML += ` ${poke2Name} es el ganador!`;
  } else {
    modalText.innerHTML += `Es un empate!`;
  }

  };

  // 7 - Vamos a practicar eventos en JS, de esta manera vamos a poder controlar cuándo traer pokemons desde la interfaz
// Nuestra función fetch va a traer pokemons cada que el código es ejecutado, es decir cuando la página se recarga
// Vamos a añadir un botón que recargue la página en cada click, así podemos obtener nuevos pokemons random cada vez.
// - Seleccionar el elmento HTML del botón
// - Llamar a la función createPokemons solo cuando se dé click a ese botón (lee sobre eventListeners https://www.w3schools.com/js/js_htmldom_eventlistener.asp )

const catchButton = document.querySelector(".button__catch");
const fightButton = document.querySelector(".button__fight");
const modalButton = document.querySelector(".button__modal");

createPokemons(poke1ID, poke2ID);

catchButton.addEventListener("click", () =>{
  window.location.reload();
});

fightButton.addEventListener("click", () => {
  const modalLayer = document.querySelector(".layer");
  const modalContainer = document.querySelector(".modal");
  modalLayer.style.display = "block";
  modalContainer.style.display = "block";

  fightPokemons();
});

modalButton.addEventListener("click", () => {
  const modalLayer = document.querySelector(".layer");
  const modalContainer = document.querySelector(".modal");
  const modalText = document.querySelector(".modal__text");
  modalLayer.style.display = "none";
  modalContainer.style.display = "none";
  modalText.innerHTML = "";
});
