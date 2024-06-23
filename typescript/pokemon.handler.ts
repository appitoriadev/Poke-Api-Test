import { Pokemon } from "./pokemon.interface";

export class PokemonHandler {
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
  modalText = document.querySelector<HTMLElement>(".modal__text")!;
  catchButton = document.querySelector<HTMLButtonElement>(".button__catch")!;
  fightButton = document.querySelector<HTMLButtonElement>(".button__fight")!;
  modalButton = document.querySelector<HTMLButtonElement>(".button__modal")!;

  getRandomNumber(numMin: number, numMax: number): number {
    return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
  }

  async getPokemon(pokeID: number): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
    const data = await response.json();
    let pokemon: Pokemon = {
      img: data.sprites.other["official-artwork"]["front_default"],
      name: data.name,
      hp: data.stats[0]["base_stat"],
      attack: data.stats[1]["base_stat"],
      defense: data.stats[2]["base_stat"],
      type: data.types[0].type.name,
    } as Pokemon;
    return pokemon;
  }

  async createPokemons(poke1ID: number, poke2ID: number): Promise<void> {
    this.poke1 = await this.getPokemon(poke1ID);
    this.poke2 = await this.getPokemon(poke2ID);

    this.assignPokemonData(
      this.poke1,
      this.poke1ImgElement,
      this.poke1NameElement,
      this.poke1HpElement,
      this.poke1AttackElement,
      this.poke1DefenseElement,
      this.poke1TypeElement
    );

    this.assignPokemonData(
      this.poke2,
      this.poke2ImgElement,
      this.poke2NameElement,
      this.poke2HpElement,
      this.poke2AttackElement,
      this.poke2DefenseElement,
      this.poke2TypeElement
    );
  }

  assignPokemonData(
    pokemon: Pokemon,
    imgElement: HTMLImageElement,
    nameElement: HTMLElement,
    hpElement: HTMLElement,
    attackElement: HTMLElement,
    defenseElement: HTMLElement,
    typeElement: HTMLElement
  ): void {
    imgElement.src = pokemon.img;
    nameElement.textContent = pokemon.name; // Fixed to correctly assign instead of append
    hpElement.textContent = pokemon.hp.toString();
    attackElement.textContent = pokemon.attack.toString(); // Fixed to correctly assign instead of append
    defenseElement.textContent = pokemon.defense.toString(); // Fixed to correctly assign instead of append
    typeElement.textContent = pokemon.type; // Fixed to correctly assign instead of append
  }

  calcularDano(ataque: number, defensa: number, hp: number): [number, number] {
    const damage: number = defensa - ataque;
    const newHP: number = damage < 0 ? hp + damage : hp;

    return [newHP, damage];
  }

  fightPokemons(): void {
    const poke1hp = parseInt(this.poke1HpElement.textContent || "0");
    const poke1Attack = parseInt(this.poke1AttackElement.textContent || "0");
    const poke1Defense = parseInt(this.poke1DefenseElement.textContent || "0");
    const poke1Name = this.poke1NameElement.textContent || "";

    const poke2hp = parseInt(this.poke2HpElement.textContent || "0");
    const poke2Attack = parseInt(this.poke2AttackElement.textContent || "0");
    const poke2Defense = parseInt(this.poke2DefenseElement.textContent || "0");
    const poke2Name = this.poke2NameElement.textContent || "";

    this.modalText.innerHTML += `${poke1Name} ataca a ${poke2Name} con ${poke1Attack} puntos de ataque <br>`;

    const [poke2newHP, poke2DmgRecibido] = this.calcularDano(
      poke1Attack,
      poke2Defense,
      poke2hp
    );

    if (poke1Attack > poke2Defense) {
      this.modalText.innerHTML += ` ${poke1Name} logra perforar la defensa de ${poke2Name} y recibe ${Math.abs(
        poke2DmgRecibido
      )} puntos de daño <br> <br> Ahora el HP de ${poke2Name} es de ${poke2newHP} <br> <br>`;
    } else {
      this.modalText.innerHTML += ` ${poke1Name}  no logra perforar la defensa de ${poke2Name} <br> <br>`;
    }

    this.modalText.innerHTML += `${poke2Name} ataca a ${poke1Name} con ${poke2Attack} puntos de ataque <br>`;

    const [poke1newHP, poke1DmgRecibido] = this.calcularDano(
      poke2Attack,
      poke1Defense,
      poke1hp
    );

    if (poke2Attack > poke1Defense) {
      this.modalText.innerHTML += ` ${poke2Name} logra perforar la defensa de ${poke1Name} y recibe ${Math.abs(
        poke1DmgRecibido
      )} puntos de daño <br> <br> Ahora el HP de ${poke1Name} es de ${poke1newHP} <br> <br>`;
    } else {
      this.modalText.innerHTML += ` ${poke2Name}  no logra perforar la defensa de ${poke1Name} <br> <br>`;
    }

    if (poke2newHP > poke1newHP) {
      this.modalText.innerHTML += ` ${poke2Name} es el ganador!`;
    } else if (poke1newHP > poke2newHP) {
      this.modalText.innerHTML += ` ${poke1Name} es el ganador!`;
    } else {
      this.modalText.innerHTML += `Es un empate!`;
    }
  }
}