import {getRandomElement} from "./util.js";

const MAX_FILMS = 2;

const getComments = function (element) {
  return element.comments.length;
};

const compareCommentsFromHigh = function (first, last) {
  return Number(last.comments.length) - Number(first.comments.length);
};

const filterTopCommentsFilms = function (element, maxElement) {
  return element.comments.length === maxElement.comments.length;
};

const getRating = function (element) {
  return element.rating;
};

const compareRatingFromHigh = function (first, last) {
  return Number(last.rating) - Number(first.rating);
};

const filterTopRatingFilms = function (element, maxElement) {
  return element.rating === maxElement.rating;
};

const getTopFilms = function (filmList, countFunction, sortFunction, filterFunction) {
  let sortedFilms = Array.from(filmList).sort(sortFunction);
  if (countFunction(sortedFilms[0]) === 0) {
    return [];
  } else {
    const topFilms = sortedFilms.filter(function (element) {
      return filterFunction(element, sortedFilms[0]);
    });
    if (topFilms.length >= MAX_FILMS) {
      const randomFilms = new Set();
      while (randomFilms.size < MAX_FILMS) {
        randomFilms.add(getRandomElement(topFilms));
      }
      return Array.from(randomFilms);
    } else {
      return sortedFilms.slice(0, MAX_FILMS);
    }
  }
};

const getTopCommentsFilms = function (filmList) {
  return getTopFilms(filmList, getComments, compareCommentsFromHigh, filterTopCommentsFilms);
};

const getTopRatingFilms = function (filmList) {
  return getTopFilms(filmList, getRating, compareRatingFromHigh, filterTopRatingFilms);
};

export {getTopCommentsFilms, getTopRatingFilms};
