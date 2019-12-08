import {NUMBER_TO_MONTH, DAY_IN_MS, TWO_HOUR_IN_MS, HOUR_IN_MS, THREE_MIN_IN_MS, MINUTE_IN_MS} from '../const.js';
import {createElement} from '../util.js';

const createReleaseDate = function (date) {
  const day = date.getDate();
  const month = NUMBER_TO_MONTH[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const createGenresStr = function (genres) {
  let fragment = ``;
  genres.forEach((element) => {
    const template = (
      `<span class="film-details__genre">${element}</span>`
    );
    fragment += template;
  });
  return fragment;
};

const createFilmDetails = function (infoDict) {
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

const formatDate = function (date) {
  const interval = Date.now() - date;

  if (interval < MINUTE_IN_MS) {
    return `now`;
  } else if (interval <= MINUTE_IN_MS && interval < THREE_MIN_IN_MS) {
    return `a minute ago`;
  } else if (interval >= THREE_MIN_IN_MS && interval < HOUR_IN_MS) {
    return `a few minutes ago`;
  } else if (interval >= HOUR_IN_MS && interval < TWO_HOUR_IN_MS) {
    return `a hour ago`;
  } else if (interval >= TWO_HOUR_IN_MS && interval < DAY_IN_MS) {
    return `a few hours ago`;
  } else {
    const daysAgo = parseInt(interval / DAY_IN_MS, 10);
    return `${daysAgo} days ago`;
  }
};

const createComments = function (comments) {
  let fragment = ``;
  comments.forEach((element) => {
    const dateStr = formatDate(element.date);
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

const createPopup = function (film) {
  const {name, releaseDate, runtime, genres, description, poster, rating} = film;
  const {director, writers, actors, country, age} = film[`extraInfo`];
  const commentsList = film[`comments`];

  const directorStr = Array.from(director).join(`, `);
  const writersStr = Array.from(writers).join(`, `);
  const actorsStr = Array.from(actors).join(`, `);
  const releaseDateStr = createReleaseDate(releaseDate);
  const genresFragment = createGenresStr(genres);

  const filmDetailsDict = {
    'Director': directorStr,
    'Writers': writersStr,
    'Actors': actorsStr,
    'Release Date': releaseDateStr,
    'Runtime': runtime,
    'Country': country,
    'Genres': genresFragment
  };

  const filmDetails = createFilmDetails(filmDetailsDict);
  const comentsCount = commentsList.length;
  const commentsFragment = createComments(commentsList);
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsFragment}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
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


class Popup {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createPopup(this._film);
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

  getFilmInfo() {
    return this._film;
  }
}

export default Popup;
