import AbstractComponent from './AbstractComponent.js';
import {MAX_DESCRIPTION_LENGTH} from '../const.js';

const createButtonsMarkup = (isInWachList, isWatched, isFavorite) => {
  const activeButtonClass = `film-card__controls-item--active`;
  const watchlistActive = isInWachList ? activeButtonClass : ``;
  const watchedActive = isWatched ? activeButtonClass : ``;
  const favoritesActive = isFavorite ? activeButtonClass : ``;
  return (
    `<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistActive}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedActive}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${favoritesActive}">Mark as favorite</button>`
  );
};

const createCard = (film, isInWachList, isWatched, isFavorite) => {
  const {name, releaseDate, runtime, genres, description, poster, comments, rating} = film;
  const year = releaseDate.getFullYear();
  const shortDescription = description.length > MAX_DESCRIPTION_LENGTH
    ? description.slice(0, MAX_DESCRIPTION_LENGTH) + `...`
    : description;
  const genre = Array.from(genres)[0];
  const commentsStr = `${comments.length} comments`;
  const buttons = createButtonsMarkup(isInWachList, isWatched, isFavorite);
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsStr}</a>
      <form class="film-card__controls">
        ${buttons}
      </form>
    </article>`
  );
};

class Card extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._isInWatchList = film.isInWatchList;
    this._isInHistory = film.isInHistory;
    this._isInFavorites = film.isInFavorites;
  }

  setOpenPopupHandler(handler) {
    const element = this.getElement();
    const title = element.querySelector(`.film-card__title`);
    title.addEventListener(`click`, handler);

    const poster = element.querySelector(`.film-card__poster`);
    poster.addEventListener(`click`, handler);

    const commentsLink = element.querySelector(`.film-card__comments`);
    commentsLink.addEventListener(`click`, handler);
  }

  setClickAddWatchListHandler(handler) {
    const button = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  setClickMarkWatchedHandler(handler) {
    const button = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  setClickAddFavoritesHandler(handler) {
    const button = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  getTemplate() {
    return createCard(this._film, this._isInWatchList, this._isInHistory, this._isInFavorites);
  }

  getFilmInfo() {
    return this._film;
  }
}

export default Card;
