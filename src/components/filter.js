import AbstractComponent from './AbstractComponent.js';
import {FILTERS} from '../const.js';

const ACTIVE_FILTER_CLASS = `main-navigation__item--active`;

const getFilmsToFilters = function (filmList) {
  const filters = {
    watchListCount: 0,
    historyCount: 0,
    favoritesCount: 0
  };

  filmList.forEach((element) => {
    if (element.isInWatchList) {
      filters[`watchListCount`] += 1;
    }
    if (element.isInHistory) {
      filters[`historyCount`] += 1;
    }
    if (element.isInFavorites) {
      filters[`favoritesCount`] += 1;
    }
  });
  return filters;
};

const createFilmMenu = function (filmList) {
  const {watchListCount, historyCount, favoritesCount} = getFilmsToFilters(filmList);
  return (
    `<nav class="main-navigation">

        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListCount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>

      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

class Filter extends AbstractComponent {
  constructor(filmList) {
    super();
    this._filmList = filmList;

    this._activeFilter = FILTERS.ALL;
  }

  getTemplate() {
    return createFilmMenu(this._filmList);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterType = evt.target.getAttribute(`href`).slice(1);
      if (this._activeFilter === filterType) {
        return;
      }

      this.setActiveFilter(filterType);

      handler(filterType);
    });
  }

  setActiveFilter(filter) {
    this._activeFilter = filter;

    const element = this.getElement();
    element.querySelector(`.${ACTIVE_FILTER_CLASS}`).classList.remove(ACTIVE_FILTER_CLASS);
    element.querySelector(`[href="#${filter}"]`).classList.add(ACTIVE_FILTER_CLASS);
  }
}

export default Filter;
