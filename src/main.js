import {getTopCommentsFilms, getTopRatingFilms} from './sorting.js';
import Rank from "./components/rank.js";
import Menu from "./components/menu.js";
import Filter from "./components/filter.js";
import FilmsContainer from "./components/container.js";
import Card from "./components/card.js";
import Button from "./components/button.js";
import Popup from "./components/popup.js";
import {genCardMockList} from "./mock/film.js";

const NUMBER_OF_CARDS_IN_ONE_LOAD = 5;
const NUMBER_OF_CARDS_IN_EXTRA = 2;
const FILMS_COUNT = 16;
const WATCHED_FILMS = 10;

const films = genCardMockList(FILMS_COUNT);
let cardCounter = 0;

const render = function (element, container) {
  container.append(element);
};
const renderCard = function (card, popup, container) {
  const body = document.querySelector(`body`);
  function openPopupHandler(evt) {
    evt.preventDefault();
    render(popup, body);
    const closeButton = popup.querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      popup.remove();
    })
  }

  render(card, container);
  const title = card.querySelector(`.film-card__title`);
  title.addEventListener(`click`, openPopupHandler);
  const poster = card.querySelector(`.film-card__poster`);
  poster.addEventListener(`click`, openPopupHandler);
  const commentsLink = card.querySelector(`.film-card__comments`);
  commentsLink.addEventListener(`click`, openPopupHandler)
};

const header = document.querySelector(`.header`);
const rank = new Rank(WATCHED_FILMS);
const rankElement = rank.getElement();
render(rankElement, header);

const main = document.querySelector(`.main`);
const menu = new Menu(films);
const menuElement = menu.getElement();
render(menuElement, main);

const filter = new Filter();
const filterElement = filter.getElement();
render(filterElement, main);

const topFilmsList = [
  getTopRatingFilms(films),
  getTopCommentsFilms(films)
];

const filmsContainer = new FilmsContainer(topFilmsList);
const filmsContainerElement = filmsContainer.getElement();
render(filmsContainerElement, main);

const cardsContainer = document.querySelector(`.films-list .films-list__container`);
for (let i = 0; i < NUMBER_OF_CARDS_IN_ONE_LOAD; i++) {
  const card = new Card(films[cardCounter]);
  const cardElement = card.getElement();
  const popup = new Popup(films[cardCounter]);
  const popupElement = popup.getElement();
  renderCard(cardElement, popupElement, cardsContainer);
  cardCounter++;
}

const topFilmsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
topFilmsList.forEach((element, index) => {
  if (element.length > 0) {
    element.forEach((film) => {
      const card = new Card(film);
      const cardElement = card.getElement();
      const popup = new Popup(film);
      const popupElement = popup.getElement();
      renderCard(cardElement, popupElement, topFilmsContainers[index]);
    })
  }
});

const filmsList = document.querySelector(`.films-list`);
const showMoreButton = new Button();
const showMoreButtonElement = showMoreButton.getElement();
render(showMoreButtonElement, filmsList);


showMoreButtonElement.addEventListener(`click`, function () {
  for (let i = 0; i < NUMBER_OF_CARDS_IN_ONE_LOAD && cardCounter < films.length; i++) {
    const cardElement = cardList[cardCounter].getElement();
    renderCard(cardElement, cardsContainer);
    cardCounter++;
  }
  if (cardCounter === films.length) {
    showMoreButtonElement.remove();
  }
});
