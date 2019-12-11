import AbstractComponent from './AbstractComponent.js';
import {MinWatchedFilmsForRank} from '../const.js';


const getRank = function (filmCount) {
  const {NOVICE, FAN, MOVIE_BUFF} = MinWatchedFilmsForRank;
  if (filmCount < NOVICE) {
    return ``;
  } else if (filmCount >= NOVICE && filmCount < FAN) {
    return `novice`;
  } else if (filmCount >= FAN && filmCount < MOVIE_BUFF) {
    return `fan`;
  } else {
    return `movie buff`;
  }
};


const createRank = function (filmCount) {
  const rank = getRank(filmCount);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class Rank extends AbstractComponent {
  constructor(filmCount) {
    super();
    this._count = filmCount;
  }

  getTemplate() {
    return createRank(this._count);
  }
}

export default Rank;
