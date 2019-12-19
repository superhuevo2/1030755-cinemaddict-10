import {render, replaceComponent} from '../utils/render.js';
import Card from '../components/card.js';
import Popup from '../components/popup.js';


class FilmController {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;

    this._film = null;

    this._card = null;
    this._popup = null;

    this._isPopupOpened = false;

    this._body = document.body;

    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._escDownHandler = this._escDownHandler.bind(this);

    this._clickAddWatchListHandler = this._clickAddWatchListHandler.bind(this);
    this._clickMarkWatchedHandler = this._clickMarkWatchedHandler.bind(this);
    this._clickAddFavoritesHandler = this._clickAddFavoritesHandler.bind(this);
  }

  render(film) {
    this._film = film;

    const oldCard = this._card;
    const oldPopup = this._popup;

    this._card = new Card(film);
    this._popup = new Popup(film);

    this._card.setOpenPopupHandler(this._openPopupHandler);
    this._popup.setClosePopupHandler(this._closePopupHandler);

    this._card.setClickAddWatchListHandler(this._clickAddWatchListHandler);
    this._popup.setClickAddWatchListHandler(this._clickAddWatchListHandler);

    this._card.setClickMarkWatchedHandler(this._clickMarkWatchedHandler);
    this._popup.setClickMarkWatchedHandler(this._clickMarkWatchedHandler);

    this._card.setClickAddFavoritesHandler(this._clickAddFavoritesHandler);
    this._popup.setClickAddFavoritesHandler(this._clickAddFavoritesHandler);

    if (oldCard && oldPopup) {
      replaceComponent(this._card, oldCard);
      replaceComponent(this._popup, oldPopup);
    } else {
      render(this._card, this._container);
    }
  }

  closePopup() {
    if (this._isPopupOpened) {
      this._closePopupHandler();
    }
  }

  _openPopupHandler(evt) {
    evt.preventDefault();

    this._viewChangeHandler();
    render(this._popup, this._body);
    this._isPopupOpened = true;

    document.addEventListener(`keydown`, this._escDownHandler);
  }

  _closePopupHandler() {
    this._isPopupOpened = false;

    const parent = this._popup.getElement().parentElement;
    parent.removeChild(this._popup.getElement());

    document.removeEventListener(`keydown`, this._escDownHandler);
  }

  _escDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopupHandler(evt);
    }
  }

  _clickAddWatchListHandler() {
    const newFilmInfo = Object.assign({}, this._film, {
      isInWatchList: !this._film.isInWatchList
    });

    this._dataChangeHandler(this, this._film, newFilmInfo);
  }

  _clickMarkWatchedHandler() {
    const newFilmInfo = Object.assign({}, this._film, {
      isInHistory: !this._film.isInHistory
    });

    this._dataChangeHandler(this, this._film, newFilmInfo);
  }

  _clickAddFavoritesHandler() {
    const newFilmInfo = Object.assign({}, this._film, {
      isInFavorites: !this._film.isInFavorites
    });

    this._dataChangeHandler(this, this._film, newFilmInfo);
  }
}


export default FilmController;
