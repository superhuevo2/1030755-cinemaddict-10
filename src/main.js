import {getTopCommentsFilms, getTopRatingFilms} from './sorting.js';
import {render, renderCards} from './utils/render.js';
import Rank from './components/rank.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import FilmsContainer from './components/filmsContainer.js';
import TopRatedList from './components/topRatedContainer.js';
import TopCommentedlist from './components/mostCommentedContainer.js';
import NoFilms from './components/NoFilms.js';
import AllFilmsContainer from './components/allFilmsContainer.js';
import Button from './components/button.js';
import {genCardMockList} from './mock/film.js';

const NUMBER_OF_CARDS_IN_ONE_LOAD = 5;
const FILMS_COUNT = 21;
const WATCHED_FILMS = 10;
const CARD_COUNTER_FOR_EXTRA = 0;
const CARDS_IN_EXTRA = 2;


const films = genCardMockList(FILMS_COUNT);
let cardCounter = 0;


const header = document.querySelector(`.header`);
const rank = new Rank(WATCHED_FILMS);
render(rank, header);

const main = document.querySelector(`.main`);
const menu = new Menu(films);
render(menu, main);

const filter = new Filter();
render(filter, main);

const filmsContainer = new FilmsContainer();
render(filmsContainer, main);


if (films.length === 0) {
  const noFilms = new NoFilms();
  render(noFilms, filmsContainer);
}


if (films.length > 0) {
  const allFilmsContainer = new AllFilmsContainer();
  const filmListElement = filmsContainer.getElement().querySelector(`.films-list`);
  render(allFilmsContainer, filmListElement);

  renderCards(films, allFilmsContainer, cardCounter, NUMBER_OF_CARDS_IN_ONE_LOAD);
  cardCounter += NUMBER_OF_CARDS_IN_ONE_LOAD;

  if (films.length > NUMBER_OF_CARDS_IN_ONE_LOAD) {
    const showMoreButton = new Button();
    const showMoreButtonElement = showMoreButton.getElement();
    render(showMoreButton, filmListElement);

    showMoreButtonElement.addEventListener(`click`, function () {
      renderCards(films, allFilmsContainer, cardCounter, NUMBER_OF_CARDS_IN_ONE_LOAD);
      cardCounter += NUMBER_OF_CARDS_IN_ONE_LOAD;
      if (cardCounter >= films.length) {
        showMoreButtonElement.remove();
      }
    });
  }
}


const topRatedFilms = getTopRatingFilms(films);
if (topRatedFilms.length > 0) {
  const topRatedList = new TopRatedList();
  render(topRatedList, filmsContainer);

  const container = topRatedList.getElement().querySelector(`.films-list__container`);
  renderCards(topRatedFilms, container, CARD_COUNTER_FOR_EXTRA, CARDS_IN_EXTRA);
}


const topCommentedFilms = getTopCommentsFilms(films);
if (topCommentedFilms.length > 0) {
  const topCommentedList = new TopCommentedlist();
  render(topCommentedList, filmsContainer);

  const container = topCommentedList.getElement().querySelector(`.films-list__container`);
  renderCards(topCommentedFilms, container, CARD_COUNTER_FOR_EXTRA, CARDS_IN_EXTRA);
}
