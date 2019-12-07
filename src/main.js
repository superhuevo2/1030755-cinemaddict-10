import {getTopCommentsFilms, getTopRatingFilms} from './sorting.js';
import {createRank} from "./components/rank.js";
import {createFilmMenu} from "./components/menu.js";
import {createFilter} from "./components/filter.js";
import {createFilmsContainer} from "./components/container.js";
import {createCard} from "./components/card.js";
import {createShowMoreButton} from "./components/button.js";
import {createPopup} from "./components/popup.js";
import {genCardMockList} from "./mock/film.js";

const NUMBER_OF_CARDS_IN_ONE_LOAD = 5;
const NUMBER_OF_CARDS_IN_EXTRA = 2;
const FILMS_COUNT = 16;
const WATCHED_FILMS = 10;

const films = genCardMockList(FILMS_COUNT);
let cardCounter = 0;

const render = function (element, container) {
  container.insertAdjacentHTML(`beforeend`, element);
};
const renderCard = function (element, container) {
  render(element, container);
  cardCounter++;
};

const header = document.querySelector(`.header`);
render(createRank(WATCHED_FILMS), header);

const main = document.querySelector(`.main`);
render(createFilmMenu(films), main);
render(createFilter(), main);

const topFilmsList = [
  getTopRatingFilms(films),
  getTopCommentsFilms(films)
];
render(createFilmsContainer(topFilmsList), main);

const cardsContainer = document.querySelector(`.films-list .films-list__container`);
for (let i = 0; i < NUMBER_OF_CARDS_IN_ONE_LOAD; i++) {
  renderCard(createCard(films[i]), cardsContainer);
}

const topFilmsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
topFilmsList.forEach((element, index) => {
  if (element.length > 0) {
    element.forEach((film) => {
      render(createCard(film), topFilmsContainers[index]);
    })
  }
});

const filmsList = document.querySelector(`.films-list`);
render(createShowMoreButton(), filmsList);
const body = document.querySelector(`body`);
render(createPopup(films[0]), body);

const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, function () {
  for (let i = 0; i < NUMBER_OF_CARDS_IN_ONE_LOAD && cardCounter < films.length; i++) {
    renderCard(createCard(films[cardCounter]), cardsContainer);
  }
  if (cardCounter === films.length) {
    showMoreButton.remove();
  }
});
