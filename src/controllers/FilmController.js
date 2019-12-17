import {render, removeElement} from '../utils/render.js';
import Card from '../components/card.js';
import Popup from '../components/popup.js';


class FilmController {
  constructor(container) {
    this._container = container;

    this._card = null;
    this._popup = null;

    this._body = document.body;

    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._escDownHandler = this._escDownHandler.bind(this);
  }

  render(film) {

    this._card = new Card(film);
    this._popup = new Popup(film);

    this._card.setOpenPopupHandler(this._openPopupHandler);
    this._popup.setClosePopupHandler(this._closePopupHandler);

    render(this._card, this._container);
  }

  _openPopupHandler(evt) {
    evt.preventDefault();
    render(this._popup, this._body);

    document.addEventListener(`keydown`, this._escDownHandler);
  }

  _closePopupHandler(evt) {
    evt.preventDefault();
    removeElement(this._popup);
    document.removeEventListener(`keydown`, this._escDownHandler);
  }

  _escDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopupHandler(evt);
    }
  }
}


export default FilmController;
