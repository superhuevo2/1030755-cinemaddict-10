import {render, removeElement} from '../utils/render.js';
import FilmController from './filmController.js';
import Sort from '../components/sort.js';
import FilmsContainer from '../components/filmsContainer.js';
import NoFilms from '../components/NoFilms.js';
import AllFilmsContainer from '../components/allFilmsContainer.js';
import Button from '../components/button.js';
import TopRatedList from '../components/topRatedContainer.js';
import TopCommentedlist from '../components/mostCommentedContainer.js';
import {SORT_TYPES, FILTERS} from '../const.js';

const NUMBER_OF_CARDS_IN_ONE_LOAD = 5;
const CARD_COUNTER_FOR_EXTRA = 0;
const CARDS_IN_EXTRA = 2;

const sortFilms = (films, sortType) => {
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

const renderCards = (filmList, container, dataChangeHandler, viewChangeHandler, cardCounter, cardForShowing) => {
  const films = filmList.slice(cardCounter, cardCounter + cardForShowing);
  return films.map((film) => {
    const filmController = new FilmController(container, dataChangeHandler, viewChangeHandler);
    filmController.render(film);
    return filmController;
  });
};


class PageController {
  constructor(filmsModel, container) {
    this._filmsModel = filmsModel;
    this._container = container;

    this._films = null;
    this._filmControllers = [];
    this._topFilmControllers = [];
    this._cardCounter = 0;
    this._activeFilter = FILTERS.ALL;
    this._currentSortType = SORT_TYPES.DEFAULT;

    this._sort = new Sort();
    this._filmsContainer = new FilmsContainer();
    this._noFilms = new NoFilms();
    this._allFilmsContainer = new AllFilmsContainer();
    this._filmListElement = null;
    this._showMoreButton = new Button();
    this._topRatedList = new TopRatedList();
    this._topCommentedList = new TopCommentedlist();

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler .bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._sort.setSortChangeHandler(this._sortChangeHandler);
  }

  render() {
    this._filmsModel.setFilterChangeHandler(() => {
      this._activeFilter = this._filmsModel.getFilterType();
      this._sortChangeHandler(this._currentSortType);
    });

    const films = this._filmsModel.getFilteredFilms();

    render(this._sort, this._container);

    render(this._filmsContainer, this._container);

    if (!films.length) {
      render(this._noFilms, this._filmsContainer);
      return;
    }

    this._filmListElement = this._filmsContainer.getElement().querySelector(`.films-list`);
    render(this._allFilmsContainer, this._filmListElement);

    this._updateFilms(films, NUMBER_OF_CARDS_IN_ONE_LOAD);


    const topRatedFilms = this._filmsModel.getTopRatedFilms();
    if (topRatedFilms.length) {
      render(this._topRatedList, this._filmsContainer);

      const container = this._topRatedList.getElement().querySelector(`.films-list__container`);
      this._topFilmControllers = this._topFilmControllers.concat(renderCards(topRatedFilms, container, this._dataChangeHandler, this._viewChangeHandler, CARD_COUNTER_FOR_EXTRA, CARDS_IN_EXTRA));
    }

    const topCommentedFilms = this._filmsModel.getMostCommentedFilms();
    if (topCommentedFilms.length) {
      render(this._topCommentedList, this._filmsContainer);

      const container = this._topCommentedList.getElement().querySelector(`.films-list__container`);
      this._topFilmControllers = this._topFilmControllers.concat(renderCards(topCommentedFilms, container, this._dataChangeHandler, this._viewChangeHandler, CARD_COUNTER_FOR_EXTRA, CARDS_IN_EXTRA));
    }
  }

  _removeFilms() {
    this._allFilmsContainer.innerHTML = ``;
    this._cardCounter = 0;

    this._filmControllers.forEach((film) => film.remove());
    this._filmControllers = [];
  }

  _renderFilms(films, count) {
    if (!films.length) {
      render(this._noFilms, this._filmsContainer);
      return;
    }

    this._filmControllers = renderCards(films, this._allFilmsContainer, this._dataChangeHandler, this._viewChangeHandler, this._cardCounter, count);
    this._cardCounter += count;
  }

  _updateFilms(films, count) {
    this._removeFilms();
    this._renderFilms(films, count);
    this._renderShowMoreButton(films);
  }

  _dataChangeHandler(controller, id, newFilmInfo, filter) {
    this._filmsModel.getFilms().some((film) => {
      if (film.id === id) {
        this._filmsModel.renewFilm(id, newFilmInfo);
        return true;
      }
      return false;
    });

    if (this._activeFilter === filter) {
      this._sortChangeHandler(this._currentSortType);
    } else {
      controller.render(newFilmInfo);
    }
  }

  _viewChangeHandler() {
    const controllers = [].concat(this._filmControllers, this._topFilmControllers);
    controllers.forEach((controller) => {
      controller.closePopup();
    });

  }

  _sortChangeHandler(sortType) {
    const films = this._filmsModel.getFilteredFilms();
    this._currentSortType = sortType;

    const sortedFilms = sortFilms(films, sortType);
    const count = this._cardCounter > NUMBER_OF_CARDS_IN_ONE_LOAD
      ? this._cardCounter : NUMBER_OF_CARDS_IN_ONE_LOAD;

    this._updateFilms(sortedFilms, count);
  }

  _renderShowMoreButton(films) {
    removeElement(this._showMoreButton);

    if (films.length <= NUMBER_OF_CARDS_IN_ONE_LOAD) {
      return;
    }
    render(this._showMoreButton, this._filmListElement);

    this._showMoreButton.setClickHandler(() => {
      this._filmControllers = this._filmControllers.concat(renderCards(films, this._allFilmsContainer, this._dataChangeHandler, this._viewChangeHandler, this._cardCounter, NUMBER_OF_CARDS_IN_ONE_LOAD));
      this._cardCounter += NUMBER_OF_CARDS_IN_ONE_LOAD;
      if (this._cardCounter >= films.length) {
        removeElement(this._showMoreButton);
      }
    });
  }
}

export default PageController;
