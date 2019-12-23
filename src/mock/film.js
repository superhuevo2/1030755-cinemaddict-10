import {FILMS, POSTERS, GENRES, EMOJIES, LOREM_IPSUM, JANUARY_01_1925_IN_MS, NOVEMBER_20_2019_IN_MS, PEOPLES} from '../const.js';
import {getRandomInt, getRandomElement} from '../utils/util.js';
import {getExtraInfo} from './popup.js';

const SENTENCE_MAX = 6;

function* genId() {
  let result = 1;

  while (true) {
    yield result++;
  }
}

const generatorId = genId();

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

function getDate(from, to) {
  const randomDateInMs = getRandomInt(from, to);
  return new Date(randomDateInMs);
}

function getGenres() {
  const count = getRandomInt(1, 4);
  const genres = new Set();
  while (genres.size < count) {
    genres.add(getRandomElement(GENRES));
  }
  return genres;
}

function getComment() {
  return {
    emojii: getRandomElement(EMOJIES),
    message: getRandomElement(LOREM_IPSUM.split(`. `)),
    name: getRandomElement(PEOPLES),
    date: getDate(NOVEMBER_20_2019_IN_MS, Date.now())
  };
}

function getComments() {
  const count = getRandomInt(0, 5);
  return (Array(...Array(count))
    .map(() => getComment())
  );
}

function genCardMock() {
  return {
    name: getRandomElement(FILMS),
    releaseDate: getDate(JANUARY_01_1925_IN_MS, Date.now()),
    runtime: getRuntime(),
    genres: getGenres(),
    description: getDescription(),
    poster: getRandomElement(POSTERS),
    comments: getComments(),
    rating: getRating(),
    isInWatchList: Math.random() > 0.5,
    isInHistory: Math.random() > 0.5,
    isInFavorites: Math.random() > 0.5,
    extraInfo: getExtraInfo(),
    id: generatorId.next().value
  };
}

function genCardMockList(count) {
  return Array(...Array(count)).map(genCardMock);
}

export {genCardMockList};
