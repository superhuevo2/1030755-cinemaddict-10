import {createRank} from "./components/rank.js";
import {createFilmMenu} from "./components/menu.js";
import {createFilter} from "./components/filter.js";
import {createFilmsContainer} from "./components/container.js";
import {createCard} from "./components/card.js";
import {createShowMoreButton} from "./components/button.js";
import {createPopup} from "./components/popup.js";


const NUMBER_OF_CARDS_IN_MAIN = 5;
const NUMBER_OF_CARDS_IN_EXTRA = 2;

const render = function (element, container) {
  container.insertAdjacentHTML(`beforeend`, element);
};

const header = document.querySelector(`.header`);
render(createRank(), header);

const main = document.querySelector(`.main`);
render(createFilmMenu(), main);
render(createFilter(), main);
render(createFilmsContainer(), main);

const filmsContainer = document.querySelector(`.films-list .films-list__container`);
Array.apply(null, {length: NUMBER_OF_CARDS_IN_MAIN})
    .forEach(() => render(createCard(), filmsContainer))

const filmsContainerExtra = document.querySelectorAll(`.films-list--extra .films-list__container`);
filmsContainerExtra.forEach((el) => {
  for (let i = 0; i < NUMBER_OF_CARDS_IN_EXTRA; i++) {
    render(createCard(), el);
  }
});

const filmsList = document.querySelector(`.films-list`);
render(createShowMoreButton(), filmsList);

const body = document.querySelector(`body`);
render(createPopup(), body);
