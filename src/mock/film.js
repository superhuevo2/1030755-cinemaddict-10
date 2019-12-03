import {FILMS, POSTERS, GENRES, LOREM_IPSUM, JANUARY_01_1925_IN_MS} from '../const.js';
import {getRandomInt, getRandomElement} from '../util.js';
import {getExtraInfo} from './popup.js';

const SENTENCE_MAX = 6;

function getRuntime() {
  const hours = getRandomInt(0, 3);
  let minutes = getRandomInt(0, 60);
  if (minutes < 10) {
    minutes = `0` + minutes;
  }
  return `${hours}h ${minutes}m`;
}

function getDescription() {
  const counter = getRandomInt(3, SENTENCE_MAX);
  const sentenceList = LOREM_IPSUM.split(`.`)
    .slice(0, -1)
    .map((el) => el + `.`);
  let description = ``;
  for (let i = 0; i < counter; i++) {
    description += (getRandomElement(sentenceList) + ` `);
  }
  return description;
}

function getRating() {
  return `${(getRandomInt(0, 100) + 1) / 10}`;
}

function getReleaseDate() {
  const randomDateInMs = getRandomInt(JANUARY_01_1925_IN_MS, Date.now());
  return new Date(randomDateInMs);
}

function getGenres() {
  const count = getRandomInt(1, 4);
  const genres = new Set();
  while (genres.size < count) {
    genres.add(getRandomElement(GENRES));
  };
  return genres;
}

function genCardMock() {
  return {
    name: getRandomElement(FILMS),
    releaseDate: getReleaseDate(),
    runtime: getRuntime(),
    genres: getGenres(),
    description: getDescription(),
    poster: getRandomElement(POSTERS),
    comments: `${getRandomInt(0, 10)} comments`,
    rating: getRating(),
    isInWachList: Math.random() > 0.5,
    isInHistory: Math.random() > 0.5,
    isInFavorites: Math.random() > 0.5,
    popup: getExtraInfo()

  };
}

function genCardMockList(count) {
  return Array(...Array(count)).map(genCardMock);
}

export {genCardMockList};
