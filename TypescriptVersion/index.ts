// // Ahora que tenemos nuestro HTML y CSS, es hora de darle vida con JavaScript <3

// // 1. Seleccionar los elementos HTML que vamos a utilizar:
// // - Imagen de los pokemon
// // - Stats de cada uno
// // Pista: revisa el método document.querySelector()

// import { PokemonHandler } from "./pokemon.handler";

interface Pokemon {
    name: string;
    img: string;
    hp: number;
    attack: number;
    defense: number;
    type: string;
}

class PokemonHandler {
    poke1: Pokemon = {
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        type: "",
        img: "",
    };
    poke2: Pokemon = {
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        type: "",
        img: "",
    };

    poke1ImgElement = document.querySelector<HTMLImageElement>(".pokemon-1__img")!;
    poke1NameElement = document.querySelector<HTMLElement>(".pokemon-1__name")!;
    poke1HpElement = document.querySelector<HTMLElement>(".pokemon-1__hp")!;
    poke1AttackElement = document.querySelector<HTMLElement>(".pokemon-1__attack")!;
    poke1DefenseElement = document.querySelector<HTMLElement>(".pokemon-1__defense")!;
    poke1TypeElement = document.querySelector<HTMLElement>(".pokemon-1__type")!;
    poke2ImgElement = document.querySelector<HTMLImageElement>(".pokemon-2__img")!;
    poke2NameElement = document.querySelector<HTMLElement>(".pokemon-2__name")!;
    poke2HpElement = document.querySelector<HTMLElement>(".pokemon-2__hp")!;
    poke2AttackElement = document.querySelector<HTMLElement>(".pokemon-2__attack")!;
    poke2DefenseElement = document.querySelector<HTMLElement>(".pokemon-2__defense")!;
    poke2TypeElement = document.querySelector<HTMLElement>(".pokemon-2__type")!;
    modalText = document.querySelector(".modal__text")!;
    catchButton = document.querySelector(".button__catch")!;
    fightButton = document.querySelector(".button__fight")!;
    modalButton = document.querySelector(".button__modal")!;

    // // 2 - Analizar la API de Pokemon :)
    // // - Haz un llamado a la URL https://pokeapi.co/api/v2/pokemon/ y analiza cómo devuelve su respuesta
    // // Al API retorna un pokemon https://pokeapi.co/api/v2/pokemon/{ID} si se provee un ID al final.
    // // Para enfrentar 2 pokemones aleatores, necesitamos hacer 2 llamados a la API con 2 n´¨úmeros aleatorios entre el 1 y el 900

    // // 3 - Crear una función que genere un número random entre 1 y 900.
    // // Puedes usar esta:
    // const getRandomNumber = (numMin, numMax) => {
    //   return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
    // };

    // // 4 - Asignar un número random al ID de los que serán nuestros pokemons
    // // Declara 2 variables para cada pokemon y guarda los números que retorna la funci´øn en ellos

    // const poke1ID = getRandomNumber(1, 900);
    // const poke2ID = getRandomNumber(1, 900);

    // // 5 - Crear una función para traer (fetch) data de la API
    // // Dale una mirada a la función fetch -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    // // Recuerda la URL de la API https://pokeapi.co/api/v2/pokemon/${pokeID}

    // const getPokemon = async (pokeID) => {
    //   const response = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokeID}`);
    //   const data = await response.json();
    //   return data;
    // };

    getRandomNumber(numMin: number, numMax: number): number {
        return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
    };

    async getPokemon(pokeID: number): Promise<Pokemon> {
        const response = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokeID}`);
        const data = await response.json();
        let pokemon: Pokemon = {
            img: data.sprites.other["official-artwork"]["front_default"],
            name: data.name,
            hp: data.stats[0]["base_stat"],
            attack: data.stats[1]["base_stat"],
            defense: data.stats[2]["base_stat"],
            type: data.types[0].type.name
        };
        return pokemon;
    }

    // // 6 - Crear los pokemons. Haz varias pruebas a las API para examinar bien qué devuelve, esa data
    // // será necesaria para popular nuestros elementos HTML
    // // Crea una función asíncrona que reciba los 2 ID de los pokemon
    // // Haz una llamada a la API por cada pokemon, guarda los datos que te devuelve en dos variables: pokemon1 y pokemon2
    // // - Toma los elementos HTML que seleccionamos más arriba y utiliza su propiendad innerHTML para añadir la info que necesitamos de la API

    // const createPokemons = async (poke1ID, poke2ID) => {
    //   const pokemon1 = await getPokemon(poke1ID);

    //   poke1ImgElement.src = pokemon1.sprites.other["official-artwork"]["front_default"];
    //   poke1NameElement.innerHTML += pokemon1.name;
    //   poke1HpElement.innerHTML = +pokemon1.stats[0]["base_stat"];
    //   poke1AttackElement.innerHTML += pokemon1.stats[1]["base_stat"];
    //   poke1DefenseElement.innerHTML += pokemon1.stats[2]["base_stat"];
    //   poke1TypeElement.innerHTML += pokemon1.types[0].type.name;

    //   const pokemon2 = await getPokemon(poke2ID);

    //   poke2ImgElement.src =
    //     pokemon2.sprites.other["official-artwork"]["front_default"];
    //   poke2NameElement.innerHTML += pokemon2.name;
    //   poke2HpElement.innerHTML += pokemon2.stats[0]["base_stat"];
    //   poke2AttackElement.innerHTML += pokemon2.stats[1]["base_stat"];
    //   poke2DefenseElement.innerHTML += pokemon2.stats[2]["base_stat"];
    //   poke2TypeElement.innerHTML += pokemon2.types[0].type.name;

    //   console.log(pokemon1);
    // };
    async createPokemons(poke1ID: number, poke2ID: number): Promise<void> {

        this.poke1 = await this.getPokemon(poke1ID);
        this.poke2 = await this.getPokemon(poke2ID);

        this.assignPokemonData(this.poke1,
            this.poke1ImgElement,
            this.poke1NameElement,
            this.poke1HpElement,
            this.poke1AttackElement,
            this.poke1DefenseElement,
            this.poke1TypeElement);

        this.assignPokemonData(this.poke2,
            this.poke2ImgElement,
            this.poke2NameElement,
            this.poke2HpElement,
            this.poke2AttackElement,
            this.poke2DefenseElement,
            this.poke2TypeElement);
    }

    assignPokemonData(pokemon: Pokemon,
        imgElement: HTMLImageElement,
        nameElement: HTMLElement,
        hpElement: HTMLElement,
        attackElement: HTMLElement,
        defenseElement: HTMLElement,
        typeElement: HTMLElement): void {
        imgElement.src = pokemon.img;
        nameElement.innerHTML += pokemon.name;
        hpElement.innerHTML = pokemon.hp.toString();
        attackElement.innerHTML += pokemon.attack;
        defenseElement.innerHTML += pokemon.defense;
        typeElement.innerHTML += pokemon.type;
    }

    calcularDano(ataque: number,
        defensa: number,
        hp: number): [number, number] {
        const damage: number = defensa - ataque;
        const newHP: number = damage < 0 ? hp + damage : hp;

        return [newHP, damage];
    }

    fightPokemons(): void {
        // 1. Seleccionar los datos que ahora tenemos en el HTML y que trajimos desde la API: para ambos pokemon: HP, attack, defense y name.
        const poke1hp = parseInt(this.poke1HpElement.innerHTML);
        const poke1Attack = parseInt(this.poke1AttackElement.innerHTML);
        const poke1Defense = parseInt(this.poke1DefenseElement.innerHTML);
        const poke1Name = this.poke1NameElement.innerHTML;

        const poke2hp = parseInt(this.poke2HpElement.innerHTML);
        const poke2Attack = parseInt(this.poke2AttackElement.innerHTML);
        const poke2Defense = parseInt(this.poke2DefenseElement.innerHTML);
        const poke2Name = this.poke2NameElement.innerHTML;

        // 2. Crear una función que calcule el daño hecho a cada pokemon. Necesitamos el poder del atacante y la defensa y los HP del que defiende
        // - Calcular el daño restando el ataque de la defensa, con esto definimos si el pokemon sufrió daño.
        // - Calcular los nuevos HP: Si la defensa es menor a 0, significa que el ataque logró perforarla e hizo daño, en este caso vamos a restar el daño de los HP, si no, la HP debe quedar igual pues no hubo da˜ño
        // En esta función vamos a devolver la nueva HP del pokemon atacado y además el da˜ñó que sufrió. - Luego vamos a necesitar estos datos -
        //calcularDano(ataque: number, defensa: number, hp: number): [number, number]

        // 3. Narrar la batalla ;). Para esto vamos a usar el elemento modal__text, aquí vamos a ir llenando su innerHTML.
        // Empecemos con el Pokemon 1.

        this.modalText.innerHTML += `${poke1Name} ataca a ${poke2Name} con ${poke1Attack} puntos de ataque <br>`;

        // Ahora calculemos el daño que le hizo a pokemon2 y cuánta vida le queda, usemos la función de calcular daño

        const [poke2newHP, poke2DmgRecibido] = this.calcularDano(
            poke1Attack,
            poke2Defense,
            poke2hp
        );

        // Vamos a narrar qué pasó en este ataque.Si el pokemon 1 tiene un ataque mayor a la denfesa del pokemon 2, debemos narrar que logra perforar su defensa
        // y describir cuánto daño recibió y cuáles son ahora sus puntos de vida
        // Si el ataque del pokemon 1 no es mayor que la denfesa del pokemon 2, significa que no logra perforarla y por lo tanto no hay daño.
        if (poke1Attack > poke2Defense) {
            this.modalText.innerHTML += ` ${poke1Name} logra perforar la defensa de ${poke2Name} y recibe ${Math.abs(poke2DmgRecibido)} puntos de daño <br> <br> Ahora el HP de ${poke2Name} es de ${poke2newHP} <br> <br>`;
        } else {
            this.modalText.innerHTML += ` ${poke1Name}  no logra perforar la defensa de ${poke2Name} <br> <br>`;
        }

        // Ahora el Pokemon2, mismo procedimiento.
        this.modalText.innerHTML += `${poke2Name} ataca a ${poke1Name} con ${poke2Attack} puntos de ataque <br>`;

        const [poke1newHP, poke1DmgRecibido] = this.calcularDano(
            poke2Attack,
            poke1Defense,
            poke1hp
        );

        if (poke2Attack > poke1Defense) {
            this.modalText.innerHTML += ` ${poke2Name} logra perforar la defensa de ${poke1Name} y recibe ${Math.abs(poke1DmgRecibido)} puntos de daño <br> <br> Ahora el HP de ${poke1Name} es de ${poke1newHP} <br> <br>`;
        } else {
            this.modalText.innerHTML += ` ${poke2Name}  no logra perforar la defensa de ${poke1Name} <br> <br>`;
        }

        // Definamos el ganador que sería el más daño haya hecho al otro pokemon.
        // Recordemos que los puntos de daño son negativos!!
        // - Si el daño recibido por pokemon 2 es menor al de pokemon 1, (es decir un mayor número negativo), significa que pokemon 1 hizo más daño, por lo tanto es el gandor!
        // - En caso de que sea menor el daño de pokemon 1, significa que pokemon 2 es el gandor
        // - El último caso posible es que ambos hayan recibido el mismo daño, en ese caso sería un empate.
        if (poke2DmgRecibido < poke1DmgRecibido) {
            this.modalText.innerHTML += ` ${poke1Name} es el ganador!`;
        } else if (poke1DmgRecibido < poke2DmgRecibido) {
            this.modalText.innerHTML += ` ${poke2Name} es el ganador!`;
        } else {
            this.modalText.innerHTML += `Es un empate!`;
        }
    }

}

let catchButton = document.querySelector<HTMLElement>(".button__catch")!;
let fightButton = document.querySelector<HTMLElement>(".button__fight")!;
let modalButton = document.querySelector<HTMLElement>(".button__modal")!;
// // 7 - Vamos a practicar eventos en JS, de esta manera vamos a poder controlar cuándo traer pokemons desde la interfaz
// // Nuestra función fetch va a traer pokemons cada que el código es ejecutado, es decir cuando la página se recarga
// // Vamos a añadir un botón que recargue la página en cada click, así podemos obtener nuevos pokemons random cada vez.
// // - Seleccionar el elmento HTML del botón
// // - Llamar a la función createPokemons solo cuando se dé click a ese botón (lee sobre eventListeners https://www.w3schools.com/js/js_htmldom_eventlistener.asp )

// const catchButton = document.querySelector(".button__catch");
// const fightButton = document.querySelector(".button__fight");
// const modalButton = document.querySelector(".button__modal");
const pokemonHandler = new PokemonHandler();

const poke1ID = pokemonHandler.getRandomNumber(1, 900);
const poke2ID = pokemonHandler.getRandomNumber(1, 900);

pokemonHandler.createPokemons(poke1ID, poke2ID);
// createPokemons(poke1ID, poke2ID);

catchButton.addEventListener("click", () => {
    window.location.reload();
});

modalButton.addEventListener("click", () => {
    const modalLayer = document.querySelector<HTMLElement>(".layer")!;
    const modalContainer = document.querySelector<HTMLElement>(".modal")!;
    modalLayer.style.display = "none";
    modalContainer.style.display = "none";
    pokemonHandler.modalText.innerHTML = "";
});

fightButton.addEventListener("click", () => {
    const modalLayer = document.querySelector<HTMLElement>(".layer")!;
    const modalContainer = document.querySelector<HTMLElement>(".modal")!;
    modalLayer.style.display = "block";
    modalContainer.style.display = "block";
    pokemonHandler.fightPokemons();
});
