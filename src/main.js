import {getTopCommentsFilms, getTopRatingFilms} from './sorting.js';
import {createRank} from "./components/rank.js";
import {createFilmMenu} from "./components/menu.js";
import {createFilter} from "./components/filter.js";
import {createFilmsContainer} from "./components/container.js";
import {createCard} from "./components/card.js";
import {createShowMoreButton} from "./components/button.js";
import {createPopup} from "./components/popup.js";
import {genCardMockList} from "./mock/film.js";
import {getRank} from "./mock/rank.js";
import {getFilmsToFilters} from "./mock/menu.js";

const NUMBER_OF_CARDS_IN_ONE_LOAD = 5;
const NUMBER_OF_CARDS_IN_EXTRA = 2;
const FILMS_COUNT = 16;
const WATCHED_FILMS = 10;

const films = genCardMockList(FILMS_COUNT);
const filmsToFilter = getFilmsToFilters(films);
let cardCounter = 0;

const render = function (element, container) {
  container.insertAdjacentHTML(`beforeend`, element);
};
const renderCard = function(element, container) {
  render(element, container);
  cardCounter++;
}

const header = document.querySelector(`.header`);
let rank = getRank(WATCHED_FILMS);
render(createRank(rank), header);

const main = document.querySelector(`.main`);
render(createFilmMenu(filmsToFilter), main);
render(createFilter(), main);

const topRatedFilms = getTopRatingFilms(films);
const topCommentedFilms = getTopCommentsFilms(films);
render(createFilmsContainer(topRatedFilms, topCommentedFilms), main);

const cardsContainer = document.querySelector(`.films-list .films-list__container`);
for (let i = 0; i < NUMBER_OF_CARDS_IN_ONE_LOAD; i++) {
  renderCard(createCard(films[i]), cardsContainer);
};

const containerToSortedFilms = new Map();
const topFilmsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

switch (topFilmsContainers.length) {
  case 0:
    break;
  case 1:
      topRatedFilms.length === 1 ? containerToSortedFilms.set(topFilmsContainers[0], topRatedFilms)
        : containerToSortedFilms.set(topFilmsContainers[0], topCommentedFilms)
    break;
  default:
    containerToSortedFilms.set(topFilmsContainers[0], topRatedFilms);
    containerToSortedFilms.set(topFilmsContainers[1], topCommentedFilms);
    break;
}

for (let [key, value] of containerToSortedFilms) {
  if (value.length > 0) {
    for (let i = 0; i < NUMBER_OF_CARDS_IN_EXTRA; i++) {
      render(createCard(value[i]), key);
    }
  }
}

const filmsList = document.querySelector(`.films-list`);
render(createShowMoreButton(), filmsList);
const body = document.querySelector(`body`);
render(createPopup(films[0]), body);

const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, function () {
  for (let i = 0; i < NUMBER_OF_CARDS_IN_ONE_LOAD && cardCounter < films.length; i++) {
    renderCard(createCard(films[cardCounter]), cardsContainer);
  };
  if (cardCounter === films.length) {
    showMoreButton.remove();
  }
})
