import {getTopCommentsFilms, getTopRatingFilms} from './sorting.js';
import {render, renderCard} from './render.js';
import Rank from './components/rank.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import FilmsContainer from './components/filmsContainer.js';
import TopRatedList from './components/topRatedContainer.js';
import TopCommentedlist from './components/mostCommentedContainer.js';
import NoFilms from './components/NoFilms.js';
import AllFilmsContainer from './components/allFilmsContainer.js';
import Card from './components/card.js';
import Popup from './components/popup.js';
import Button from './components/button.js';
import {genCardMockList} from './mock/film.js';

const NUMBER_OF_CARDS_IN_ONE_LOAD = 5;
const FILMS_COUNT = 21;
const WATCHED_FILMS = 10;

const films = genCardMockList(FILMS_COUNT);
let cardCounter = 0;


const header = document.querySelector(`.header`);
const rank = new Rank(WATCHED_FILMS);
const rankElement = rank.getElement();
render(rankElement, header);

const main = document.querySelector(`.main`);
const menu = new Menu(films);
const menuElement = menu.getElement();
render(menuElement, main);

const filter = new Filter();
const filterElement = filter.getElement();
render(filterElement, main);


const filmsContainer = new FilmsContainer();
const filmsContainerElement = filmsContainer.getElement();
render(filmsContainerElement, main);

if (films.length === 0) {
  const noFilms = new NoFilms();
  const noFilmsElement = noFilms.getElement();
  render(noFilmsElement, filmsContainerElement);
}


if (films.length > 0) {
  const allFilmsContainer = new AllFilmsContainer();
  const allFilmsContainerElement = allFilmsContainer.getElement();
  const filmListElement = filmsContainerElement.querySelector(`.films-list`);
  render(allFilmsContainerElement, filmListElement);

  films.slice(cardCounter, cardCounter + NUMBER_OF_CARDS_IN_ONE_LOAD)
    .forEach((film) => {
      const card = new Card(film);
      const cardElement = card.getElement();
      const popup = new Popup(film);
      const popupElement = popup.getElement();
      renderCard(cardElement, popupElement, allFilmsContainerElement);
      cardCounter++;
    });

  if (films.length > NUMBER_OF_CARDS_IN_ONE_LOAD) {
    const showMoreButton = new Button();
    const showMoreButtonElement = showMoreButton.getElement();
    render(showMoreButtonElement, filmListElement);
    showMoreButtonElement.addEventListener(`click`, function () {
      films.slice(cardCounter, cardCounter + NUMBER_OF_CARDS_IN_ONE_LOAD)
        .forEach((film) => {
          const card = new Card(film);
          const cardElement = card.getElement();
          const popup = new Popup(film);
          const popupElement = popup.getElement();
          renderCard(cardElement, popupElement, allFilmsContainerElement);
          cardCounter++;
          if (cardCounter === films.length) {
            showMoreButtonElement.remove();
          }
        });
    });
  }
}

const topRatedFilms = getTopRatingFilms(films);
if (topRatedFilms.length > 0) {
  const topRatedList = new TopRatedList();
  const topRatedListElement = topRatedList.getElement();
  render(topRatedListElement, filmsContainerElement);

  const container = topRatedListElement.querySelector(`.films-list__container`);
  topRatedFilms.forEach((film) => {
    const card = new Card(film);
    const cardElement = card.getElement();
    const popup = new Popup(film);
    const popupElement = popup.getElement();
    renderCard(cardElement, popupElement, container);
    cardCounter++;
  });
}


const topCommentedFilms = getTopCommentsFilms(films);
if (topCommentedFilms.length > 0) {
  const topCommentedList = new TopCommentedlist();
  const topCommentedListElement = topCommentedList.getElement();
  render(topCommentedListElement, filmsContainerElement);

  const container = topCommentedListElement.querySelector(`.films-list__container`);
  topCommentedFilms.forEach((film) => {
    const card = new Card(film);
    const cardElement = card.getElement();
    const popup = new Popup(film);
    const popupElement = popup.getElement();
    renderCard(cardElement, popupElement, container);
    cardCounter++;
  });
}
