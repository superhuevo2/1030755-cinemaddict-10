import {getTopCommentsFilms, getTopRatingFilms} from '../utils/sorting.js';
import {FILTERS} from '../const.js';

class FilmsModel {
  constructor() {
    this._films = null;
    this._filteredFilms = null;

    this._filterType = FILTERS.ALL;

    this._dataChangeHandler = null;
  }

  setFilms(films) {
    this._films = films;
  }

  getFilms() {
    return this._films;
  }

  getFilteredFilms() {
    this._filteredFilms = this._films.filter((film) => {
      switch (this._filterType) {
        case FILTERS.ALL:
          return true;
        case FILTERS.WATCHLIST:
          return film.isInWatchList;
        case FILTERS.HISTORY:
          return film.isInHistory;
        case FILTERS.FAVORITES:
          return film.isInFavorites;
        default:
          return false;
      }
    });
    return this._filteredFilms;
  }

  getTopRatedFilms() {
    return getTopRatingFilms(this._filteredFilms);
  }

  getMostCommentedFilms() {
    return getTopCommentsFilms(this._filteredFilms);
  }

  renewFilm(id, newFilmInfo) {
    this._films.some((film, i) => {
      if (film.id === id) {
        this._films[i] = newFilmInfo;
        this._dataChangeHandler();
        return true;
      }
      return false;
    });
  }

  getFilterType() {
    return this._filterType;
  }

  changeFilterType(filterType) {
    this._filterType = filterType;

    this._filterChangeHandler();
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandler = handler;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
  }
}

export default FilmsModel;
