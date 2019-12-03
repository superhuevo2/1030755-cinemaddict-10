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

function formatTime(date) {
  const hours = date.getHours() < 10 ? `0` + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0` + date.getMinutes() : date.getMinutes();
  return `${hours}:${minutes}`;
}

export {getRandomInt, getRandomElement, formatTime}
