import AbstractComponent from './AbstractComponent.js';
import {MAX_DESCRIPTION_LENGTH} from '../const.js';

const createCard = function (film) {
  const {name, releaseDate, runtime, genres, description, poster, comments, rating} = film;
  const year = releaseDate.getFullYear();
  const shortDescription = description.length > MAX_DESCRIPTION_LENGTH
    ? description.slice(0, MAX_DESCRIPTION_LENGTH) + `...`
    : description;
  const genre = Array.from(genres)[0];
  const commentsStr = `${comments.length} comments`;
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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

class Card extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCard(this._film);
  }

  getFilmInfo() {
    return this._film;
  }
}

export default Card;
