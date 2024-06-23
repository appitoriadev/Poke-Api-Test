var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class PokemonHandler {
    constructor() {
        this.poke1 = {
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            type: "",
            img: "",
        };
        this.poke2 = {
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            type: "",
            img: "",
        };
        this.poke1ImgElement = document.querySelector(".pokemon-1__img");
        this.poke1NameElement = document.querySelector(".pokemon-1__name");
        this.poke1HpElement = document.querySelector(".pokemon-1__hp");
        this.poke1AttackElement = document.querySelector(".pokemon-1__attack");
        this.poke1DefenseElement = document.querySelector(".pokemon-1__defense");
        this.poke1TypeElement = document.querySelector(".pokemon-1__type");
        this.poke2ImgElement = document.querySelector(".pokemon-2__img");
        this.poke2NameElement = document.querySelector(".pokemon-2__name");
        this.poke2HpElement = document.querySelector(".pokemon-2__hp");
        this.poke2AttackElement = document.querySelector(".pokemon-2__attack");
        this.poke2DefenseElement = document.querySelector(".pokemon-2__defense");
        this.poke2TypeElement = document.querySelector(".pokemon-2__type");
        this.modalText = document.querySelector(".modal__text");
        this.catchButton = document.querySelector(".button__catch");
        this.fightButton = document.querySelector(".button__fight");
        this.modalButton = document.querySelector(".button__modal");
    }
    getRandomNumber(numMin, numMax) {
        return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
    }
    getPokemon(pokeID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
            const data = yield response.json();
            let pokemon = {
                img: data.sprites.other["official-artwork"]["front_default"],
                name: data.name,
                hp: data.stats[0]["base_stat"],
                attack: data.stats[1]["base_stat"],
                defense: data.stats[2]["base_stat"],
                type: data.types[0].type.name,
            };
            return pokemon;
        });
    }
    createPokemons(poke1ID, poke2ID) {
        return __awaiter(this, void 0, void 0, function* () {
            this.poke1 = yield this.getPokemon(poke1ID);
            this.poke2 = yield this.getPokemon(poke2ID);
            this.assignPokemonData(this.poke1, this.poke1ImgElement, this.poke1NameElement, this.poke1HpElement, this.poke1AttackElement, this.poke1DefenseElement, this.poke1TypeElement);
            this.assignPokemonData(this.poke2, this.poke2ImgElement, this.poke2NameElement, this.poke2HpElement, this.poke2AttackElement, this.poke2DefenseElement, this.poke2TypeElement);
        });
    }
    assignPokemonData(pokemon, imgElement, nameElement, hpElement, attackElement, defenseElement, typeElement) {
        imgElement.src = pokemon.img;
        nameElement.textContent = pokemon.name; // Fixed to correctly assign instead of append
        hpElement.textContent = pokemon.hp.toString();
        attackElement.textContent = pokemon.attack.toString(); // Fixed to correctly assign instead of append
        defenseElement.textContent = pokemon.defense.toString(); // Fixed to correctly assign instead of append
        typeElement.textContent = pokemon.type; // Fixed to correctly assign instead of append
    }
    calcularDano(ataque, defensa, hp) {
        const damage = defensa - ataque;
        const newHP = damage < 0 ? hp + damage : hp;
        return [newHP, damage];
    }
    fightPokemons() {
        const poke1hp = parseInt(this.poke1HpElement.textContent || "0");
        const poke1Attack = parseInt(this.poke1AttackElement.textContent || "0");
        const poke1Defense = parseInt(this.poke1DefenseElement.textContent || "0");
        const poke1Name = this.poke1NameElement.textContent || "";
        const poke2hp = parseInt(this.poke2HpElement.textContent || "0");
        const poke2Attack = parseInt(this.poke2AttackElement.textContent || "0");
        const poke2Defense = parseInt(this.poke2DefenseElement.textContent || "0");
        const poke2Name = this.poke2NameElement.textContent || "";
        this.modalText.innerHTML += `${poke1Name} ataca a ${poke2Name} con ${poke1Attack} puntos de ataque <br>`;
        const [poke2newHP, poke2DmgRecibido] = this.calcularDano(poke1Attack, poke2Defense, poke2hp);
        if (poke1Attack > poke2Defense) {
            this.modalText.innerHTML += ` ${poke1Name} logra perforar la defensa de ${poke2Name} y recibe ${Math.abs(poke2DmgRecibido)} puntos de daño <br> <br> Ahora el HP de ${poke2Name} es de ${poke2newHP} <br> <br>`;
        }
        else {
            this.modalText.innerHTML += ` ${poke1Name}  no logra perforar la defensa de ${poke2Name} <br> <br>`;
        }
        this.modalText.innerHTML += `${poke2Name} ataca a ${poke1Name} con ${poke2Attack} puntos de ataque <br>`;
        const [poke1newHP, poke1DmgRecibido] = this.calcularDano(poke2Attack, poke1Defense, poke1hp);
        if (poke2Attack > poke1Defense) {
            this.modalText.innerHTML += ` ${poke2Name} logra perforar la defensa de ${poke1Name} y recibe ${Math.abs(poke1DmgRecibido)} puntos de daño <br> <br> Ahora el HP de ${poke1Name} es de ${poke1newHP} <br> <br>`;
        }
        else {
            this.modalText.innerHTML += ` ${poke2Name}  no logra perforar la defensa de ${poke1Name} <br> <br>`;
        }
        if (poke2newHP > poke1newHP) {
            this.modalText.innerHTML += ` ${poke2Name} es el ganador!`;
        }
        else if (poke1newHP > poke2newHP) {
            this.modalText.innerHTML += ` ${poke1Name} es el ganador!`;
        }
        else {
            this.modalText.innerHTML += `Es un empate!`;
        }
    }
}
