import AbstractSmartComponent from './AbstractSmartComponents.js';
import moment from 'moment';

const SCORELIST = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`];


moment.relativeTimeThreshold(`d`, 10000);
moment.updateLocale(`en`, {
  relativeTime: {
    s: `now`,
    ss: `now`,
    m: `a minute`,
    mm: `a few minutes`,
    h: `an hour`,
    hh: `a few hours`,
    d: `a day`,
    dd: `%d days`
  }
});

const createGenresStr = (genres) => {
  let fragment = ``;
  genres.forEach((element) => {
    const template = (
      `<span class="film-details__genre">${element}</span>`
    );
    fragment += template;
  });
  return fragment;
};

const createFilmDetails = (infoDict) => {
  let fragment = ``;
  for (let key in infoDict) {
    if (infoDict.hasOwnProperty(key)) {
      const template = (
        `<tr class="film-details__row">
          <td class="film-details__term">${key}</td>
          <td class="film-details__cell">${infoDict[key]}</td>
        </tr>`
      );
      fragment += template;
    }
  }
  return fragment;
};

const createUserScore = (name, poster, userScore) => {

  let scoreMarkup = ``;

  SCORELIST.forEach((score) => {
    let checkedAttr;

    if (score === userScore) {
      checkedAttr = `checked`;
    } else {
      checkedAttr = ``;
    }

    const scoreTemplate = (
      `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${score}" id="rating-${score}" ${checkedAttr}>
      <label class="film-details__user-rating-label" for="rating-${score}">${score}</label>`
    );

    scoreMarkup += scoreTemplate;
  });

  return (
    `<div class="form-details__middle-container">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="./images/posters/${poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${name}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            ${scoreMarkup}
          </div>
        </section>
      </div>
    </section>
  </div>`
  );
};

const createComments = (comments) => {
  let fragment = ``;
  comments.forEach((element) => {
    const dateStr = moment(element.date).fromNow();
    const template = (
      `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${element.emojii}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${element.message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${element.name}</span>
          <span class="film-details__comment-day">${dateStr}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
    );
    fragment += template;
  });
  return fragment;
};

const createPopup = (film, isWatched, isInWatchList, isInFavorites, userScore, addedEmojii) => {
  const {name, releaseDate, runtime, genres, description, poster, rating} = film;
  const {director, writers, actors, country, age} = film[`extraInfo`];
  const commentsList = film[`comments`];

  const directorStr = Array.from(director).join(`, `);
  const writersStr = Array.from(writers).join(`, `);
  const actorsStr = Array.from(actors).join(`, `);
  const releaseDateStr = moment(releaseDate).format(`D MMMM YYYY`);

  const genresFragment = createGenresStr(genres);
  const genreName = genres.size > 1 ? `Genres` : `Genre`;
  const filmDetailsDict = {
    'Director': directorStr,
    'Writers': writersStr,
    'Actors': actorsStr,
    'Release Date': releaseDateStr,
    'Runtime': runtime,
    'Country': country,
    [genreName]: genresFragment
  };

  const userScoreMarkup = isWatched ? createUserScore(name, poster, userScore) : ``;
  const userRate = userScore ? (
    `<p class="film-details__user-rating">Your rate ${userScore}</p>`
  ) : ``;

  const filmDetails = createFilmDetails(filmDetailsDict);

  const comentsCount = commentsList.length;
  const commentsFragment = createComments(commentsList);

  const addedEmojiiMarkup = addedEmojii ? (
    `<img src="images/emoji/${addedEmojii}.png" width="55" height="55" alt="emoji">`
  ) : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${name}">

              <p class="film-details__age">${age}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${name}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                  ${userRate}
                </div>
              </div>

              <table class="film-details__table">
                ${filmDetails}
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchList ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isInFavorites ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        ${userScoreMarkup}
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsFragment}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${addedEmojiiMarkup}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="puke">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};


class Popup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._isInWatchList = film.isInWatchList;
    this._isWatched = film.isInHistory;
    this._isInFavorites = film.isInFavorites;
    this._userScore = null;
    this._addedEmojii = null;

    this._closePopupHandler = null;
    this._clickAddWatchListHandler = null;
    this._clickMarkWatchedHandler = null;
    this._clickAddFavoritesHandler = null;

    this._subscribeOnEvents = this._subscribeOnEvents.bind(this);
    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setClosePopupHandler(this._closePopupHandler);
    this.setClickAddWatchListHandler(this._clickAddWatchListHandler);
    this.setClickMarkWatchedHandler(this._clickMarkWatchedHandler);
    this.setClickAddFavoritesHandler(this._clickAddFavoritesHandler);
  }

  setClosePopupHandler(handler) {
    this._closePopupHandler = handler;
    const element = this.getElement();
    const closeButton = element.querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  setClickAddWatchListHandler(handler) {
    this._clickAddWatchListHandler = handler;
    const button = this.getElement().querySelector(`.film-details__control-label--watchlist`);
    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  setClickMarkWatchedHandler(handler) {
    this._clickMarkWatchedHandler = handler;
    const button = this.getElement().querySelector(`.film-details__control-label--watched`);
    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  setClickAddFavoritesHandler(handler) {
    this._clickAddFavoritesHandler = handler;
    const button = this.getElement().querySelector(`.film-details__control-label--favorite`);
    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  getTemplate() {
    return createPopup(this._film, this._isWatched, this._isInWatchList, this._isInFavorites, this._userScore, this._addedEmojii);
  }

  _reset() {
    this._addedEmojii = null;

    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    if (this._isWatched) {
      const ratingControls = element.querySelector(`.film-details__user-rating-score`);
      ratingControls.addEventListener(`change`, (evt) => {
        this._userScore = evt.target.value;

        this.rerender();
      });

      const resetButton = element.querySelector(`.film-details__watched-reset`);
      resetButton.addEventListener(`click`, () => {
        this._userScore = null;

        this.rerender();
      });
    }

    const emojies = element.querySelector(`.film-details__emoji-list`);
    emojies.addEventListener(`change`, (evt) => {
      this._addedEmojii = evt.target.value;

      this.rerender();
    });
  }
}

export default Popup;
