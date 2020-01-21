import {render, replaceComponent, removeElement} from '../utils/render.js';
import Card from '../components/card.js';
import Popup from '../components/popup.js';
import {FIELDS} from '../const.js';


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

    this._clickRatingHandler = this._clickRatingHandler.bind(this);
    this._sendCommentHandler = this._sendCommentHandler.bind(this);
    this._removeCommentHandler = this._removeCommentHandler.bind(this);
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

    this._popup.setClickRatingHandlers(this._clickRatingHandler);
    this._popup.setRemoveCommentHandler(this._removeCommentHandler);

    if (oldCard && oldPopup) {
      replaceComponent(this._card, oldCard);
      replaceComponent(this._popup, oldPopup);
    } else {
      render(this._card, this._container);
    }
  }

  renderPopup(film) {
    this._film = film;

    this._popup = new Popup(film);

    this._popup.setClosePopupHandler(this._closePopupHandler);
    this._popup.setClickAddWatchListHandler(this._clickAddWatchListHandler);
    this._popup.setClickMarkWatchedHandler(this._clickMarkWatchedHandler);
    this._popup.setClickAddFavoritesHandler(this._clickAddFavoritesHandler);
    this._popup.setRemoveCommentHandler(this._removeCommentHandler);

    render(this._popup, this._body);
  }

  rerender() {
    this.reset();
    this.render(this._film);
  }

  reset() {
    this._card = null;
    this._popup = null;
  }

  remove() {
    removeElement(this._card);
    removeElement(this._popup);
  }

  closePopup() {
    if (this._isPopupOpened) {
      this._closePopupHandler();
    }
  }

  openPopup() {
    this._openPopupHandler();
  }

  isPopupOpen() {
    return this._isPopupOpened;
  }

  _openPopupHandler() {

    this._viewChangeHandler();
    render(this._popup, this._body);
    this._isPopupOpened = true;

    document.addEventListener(`keydown`, this._sendCommentHandler);
    document.addEventListener(`keydown`, this._escDownHandler);
  }

  _closePopupHandler() {
    this._isPopupOpened = false;

    const parent = this._popup.getElement().parentElement;
    parent.removeChild(this._popup.getElement());

    document.removeEventListener(`keydown`, this._sendCommentHandler);
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

    this._dataChangeHandler(this, this._film, newFilmInfo, FIELDS.WATCHLIST);
  }

  _clickMarkWatchedHandler() {

    const newFilmInfo = Object.assign({}, this._film, {
      isInHistory: !this._film.isInHistory
    });

    this._dataChangeHandler(this, this._film, newFilmInfo, FIELDS.HISTORY);
  }

  _clickAddFavoritesHandler() {
    const newFilmInfo = Object.assign({}, this._film, {
      isInFavorites: !this._film.isInFavorites
    });

    this._dataChangeHandler(this, this._film, newFilmInfo, FIELDS.FAVORITES);
  }

  _clickRatingHandler() {
    const userScore = this._popup.getUserScore();

    this._dataChangeHandler(this, this._film, userScore, FIELDS.USER_SCORE);
  }

  _sendCommentHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      const comment = this._popup.saveComment();
      if (comment) {
        this._dataChangeHandler(this, this._film, comment, FIELDS.COMMENT_NEW);
      }
    }
  }

  _removeCommentHandler(indexOfComment) {
    this._dataChangeHandler(this, this._film, indexOfComment, FIELDS.COMMENT_FOR_DELETE);
  }
}


export default FilmController;
