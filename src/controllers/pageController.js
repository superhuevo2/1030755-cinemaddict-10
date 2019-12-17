import {getTopCommentsFilms, getTopRatingFilms} from '../sorting.js';
import {render, renderCard, removeElement} from '../utils/render.js';
import FilmController from './FilmController.js';
import Rank from '../components/rank.js';
import Menu from '../components/menu.js';
import Sort from '../components/sort.js';
import FilmsContainer from '../components/filmsContainer.js';
import NoFilms from '../components/NoFilms.js';
import AllFilmsContainer from '../components/allFilmsContainer.js';
import Button from '../components/button.js';
import TopRatedList from '../components/topRatedContainer.js';
import TopCommentedlist from '../components/mostCommentedContainer.js';

const NUMBER_OF_CARDS_IN_ONE_LOAD = 5;
const WATCHED_FILMS = 10;
const CARD_COUNTER_FOR_EXTRA = 0;
const CARDS_IN_EXTRA = 2;
const FIRST_FILM = 0;

const sortFilms = function (films, sortType) {
  switch (sortType) {
    case `default`:
      return films;
    case `date`:
      return Array.from(films).sort((a, b) => b.releaseDate - a.releaseDate);
    case `rating`:
      return Array.from(films).sort((a, b) => b.rating - a.rating);
    default:
      return void 0;
  }
};

const renderCards = function (filmList, container, cardCounter, cardForShowing) {
  const films = filmList.slice(cardCounter, cardCounter + cardForShowing);
  films.forEach((film) => {
    const filmController = new FilmController(container);
    filmController.render(film);
  });
};

class PageController {
  constructor(container) {
    this._container = container;
    this._films = null;
    this._cardCounter = 0;
    this._rank = new Rank(WATCHED_FILMS);
    this._menu = null;
    this._sort = new Sort();
    this._filmsContainer = new FilmsContainer();
    this._noFilms = new NoFilms();
    this._allFilmsContainer = new AllFilmsContainer();
    this._filmListElement = null;
    this._showMoreButton = new Button();
    this._topRatedList = new TopRatedList();
    this._topCommentedList = new TopCommentedlist();

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  render(films) {
    this._films = films;

    const header = this._container.querySelector(`.header`);
    render(this._rank, header);

    const main = this._container.querySelector(`.main`);
    this._menu = new Menu(films);
    render(this._menu, main);

    render(this._sort, main);
    this._sort.setSortChangeHandler(this._sortChangeHandler);

    render(this._filmsContainer, main);

    if (!films.length) {
      render(this._noFilms, this._filmsContainer);
      return;
    }


    this._filmListElement = this._filmsContainer.getElement().querySelector(`.films-list`);
    render(this._allFilmsContainer, this._filmListElement);

    renderCards(films, this._allFilmsContainer, this._cardCounter, NUMBER_OF_CARDS_IN_ONE_LOAD);
    this._cardCounter += NUMBER_OF_CARDS_IN_ONE_LOAD;

    if (films.length > NUMBER_OF_CARDS_IN_ONE_LOAD) {
      this._renderShowMoreButton(films)
    }


    const topRatedFilms = getTopRatingFilms(films);
    if (topRatedFilms.length) {
      render(this._topRatedList, this._filmsContainer);

      const container = this._topRatedList.getElement().querySelector(`.films-list__container`);
      renderCards(topRatedFilms, container, CARD_COUNTER_FOR_EXTRA, CARDS_IN_EXTRA);
    }

    const topCommentedFilms = getTopCommentsFilms(films);
    if (topCommentedFilms.length) {
      render(this._topCommentedList, this._filmsContainer);

      const container = this._topCommentedList.getElement().querySelector(`.films-list__container`);
      renderCards(topCommentedFilms, container, CARD_COUNTER_FOR_EXTRA, CARDS_IN_EXTRA);
    }
  }

  _sortChangeHandler(sortType) {

    const sortedFilms = sortFilms(this._films, sortType);
    this._allFilmsContainer.getElement().innerHTML = ``;
    renderCards(sortedFilms, this._allFilmsContainer, FIRST_FILM, this._cardCounter);

    removeElement(this._showMoreButton)
    this._renderShowMoreButton(sortedFilms);
  }

  _renderShowMoreButton(films) {
    if (films.length <= NUMBER_OF_CARDS_IN_ONE_LOAD) {
      return;
    }
    render(this._showMoreButton, this._filmListElement);

    this._showMoreButton.setClickHandler(() => {
      renderCards(films, this._allFilmsContainer, this._cardCounter, NUMBER_OF_CARDS_IN_ONE_LOAD);
      this._cardCounter += NUMBER_OF_CARDS_IN_ONE_LOAD;
      if (this._cardCounter >= films.length) {
        removeElement(this._showMoreButton);
      }
    });
  }
}

export default PageController;
