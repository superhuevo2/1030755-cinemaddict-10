import {createElement} from '../util.js';

const getFilmsToFilters = function (filmList) {
  const filters = {
    watchListCount: 0,
    historyCount: 0,
    favoritesCount: 0
  };

  filmList.forEach((element) => {
    if (element.isInWachList) {
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

class Menu {
  constructor(filmList) {
    this._filmList = filmList;
    this._element = null;
  }

  getTemplate() {
    return createFilmMenu(this._filmList);
  }

  getElement() {
    if (!this._element) {
      const template = this.getTemplate();
      this._element = createElement(template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Menu;
