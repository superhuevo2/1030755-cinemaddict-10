import {getRandomElement} from "./util.js";

const MAX_FILMS = 2;

function getComments(element) {
  return element.comments.length;
}

function compareCommentsFromHigh(first, last) {
  return Number(last.comments.length) - Number(first.comments.length);
}

function filterTopCommentsFilms(element, maxElement) {
  return element.comments.length === maxElement.comments.length;
}

function getRating(element) {
  return element.rating;
}

function compareRatingFromHigh(first, last) {
  return Number(last.rating) - Number(first.rating);
}

function filterTopRatingFilms(element, maxElement) {
  return element.rating === maxElement.rating;
}

function getTopFilms(filmList, countFunction, sortFunction, filterFunction) {
  let sortedFilms = Array.from(filmList).sort(sortFunction);
  if (countFunction(sortedFilms[0]) === 0) {
    return [];
  } else {
    const topFilms = sortedFilms.filter(function (element) {
      return filterFunction(element, sortedFilms[0]);
    });
    if (topFilms.length >= MAX_FILMS) {
      const randomFilms = new Set();
      while (randomFilms.size < 2) {
        randomFilms.add(getRandomElement(topFilms));
      }
      return Array.from(randomFilms);
    } else {
      return sortedFilms.slice(0, 2);
    }
  }
}

function getTopCommentsFilms(filmList) {
  return getTopFilms(filmList, getComments, compareCommentsFromHigh, filterTopCommentsFilms);
}

function getTopRatingFilms(filmList) {
  return getTopFilms(filmList, getRating, compareRatingFromHigh, filterTopRatingFilms);
}

export {getTopCommentsFilms, getTopRatingFilms};
