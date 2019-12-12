import {PEOPLES, COUNTRIES} from '../const.js';
import {getRandomInt, getRandomElement} from '../utils/util.js';

function getPeoples(count) {
  const peoples = new Set();
  while (peoples.size < count) {
    peoples.add(PEOPLES[getRandomInt(0, PEOPLES.length)]);
  }
  return peoples;
}

function getExtraInfo() {
  return {
    director: getPeoples(1),
    writers: getPeoples(2),
    actors: getPeoples(5),
    country: getRandomElement(COUNTRIES),
    age: `${getRandomInt(0, 19)}+`
  };
}


export {getExtraInfo};
