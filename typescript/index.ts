import { PokemonHandler } from "./pokemon.handler";

// const bodyDOM = document.getElementsByTagName("body")[0];
// bodyDOM.addEventListener("load", () => {
  const catchButton = document.querySelector<HTMLElement>(".button__catch")!;
  const fightButton = document.querySelector<HTMLElement>(".button__fight")!;
  const modalButton = document.querySelector<HTMLElement>(".button__modal")!;

  const pokemonHandler = new PokemonHandler();

  const poke1ID = pokemonHandler.getRandomNumber(1, 900);
  const poke2ID = pokemonHandler.getRandomNumber(1, 900);

  pokemonHandler.createPokemons(poke1ID, poke2ID);

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
// });
