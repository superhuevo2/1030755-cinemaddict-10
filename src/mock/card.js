import {Films, Posters, Genres, LOREM_IPSUM, YEAR_FROM, YEAR_TO} from '../const.js';

const SENTENCE_MAX = 4;

/**
 * from <= returned random < to
 * @param {number} from integer
 * @param {number} to integer
 * @return {number} random integer.
 */
function getRandomInt(from, to) {
  return from + Math.floor(Math.random() * (to - from));
}

/**
 * return random element from array
 * @param {*} arr
 * @return {*} random element
 */
function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length)];
}

function getRuntime() {
  const hours = getRandomInt(0, 3);
  let minutes = getRandomInt(0, 60);
  if (minutes < 10) {
    minutes = `0` + minutes;
  }
  return `${hours}h ${minutes}m`;
}

function getDescription() {
  const counter = getRandomInt(1, SENTENCE_MAX);
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

function genCardMock() {
  return {
    name: getRandomElement(Films),
    year: getRandomInt(YEAR_FROM, YEAR_TO),
    runtime: getRuntime(),
    genres: getRandomElement(Genres),
    description: getDescription(),
    poster: getRandomElement(Posters),
    comments: `${getRandomInt(0, 10)} comments`,
    rating: getRating()
  };
}

function genCardMockList(count) {
  return Array(...Array(count)).map(genCardMock);
}

export {genCardMockList};
