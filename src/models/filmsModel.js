import {getTopCommentsFilms, getTopRatingFilms} from '../utils/sorting.js';
import {FILTERS} from '../const.js';

class FilmsModel {
  constructor() {
    this._films = null;
    this._filteredFilms = null;

    this._filterType = FILTERS.ALL;

    // this._getFilmById = this._getFilmById.bind(this);
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

  getFilmById(id) {
    return this._films[this._getFilmIndexById(id)];
  }

  updateFilmInfo(id, newFilmInfo) {
    this._films[this._getFilmIndexById(id)] = newFilmInfo;
    this._dataChangeHandler();
  }

  addComment(id, comment) {
    this._films[this._getFilmIndexById(id)].comments.unshift(comment);
  }

  removeComment(id, commentIndex) {
    const filmIndex = this._getFilmIndexById(id);

    this._films[filmIndex].comments = [].concat(
        this._films[filmIndex].comments.slice(0, commentIndex),
        this._films[filmIndex].comments.slice(commentIndex + 1)
    );
  }

  addUserScore(id, userScore) {
    const filmIndex = this._getFilmIndexById(id);
    const score = Number(userScore);
    this._films[filmIndex].userScore = score;
    if (score) {
      if (!this._films[filmIndex].oldRating) {
        this._films[filmIndex].oldRating = Number(this._films[filmIndex].rating);
      }

      this._films[filmIndex].rating = String((this._films[filmIndex].oldRating + score) / 2);

    } else {
      this._films[filmIndex].rating = String(this._films[filmIndex].oldRating);
    }
  }

  removeUserScore(id) {
    const filmIndex = this._getFilmIndexById(id);
    this._films[filmIndex].userScore = null;
    if (this._films[filmIndex].oldRating) {
      this._films[filmIndex].rating = this._films[filmIndex].oldRating;
    }
    this._films[filmIndex].oldRating = null;
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

  _getFilmIndexById(id) {
    let index;
    this._films.some((film, i) => {
      if (film.id === id) {
        index = i;
        return true;
      }
      return false;
    });
    return index;
  }
}

export default FilmsModel;
