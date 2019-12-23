

class FilmsModel {
  constructor() {
    this._films = null;

    this._dataChangeHandler = null;
  }

  setFilms(films) {
    this._films = films;
  }

  getFilms() {
    return this._films;
  }

  renewFilm(id, newFilmInfo) {
    this._films.some((film, i) => {
      if (film.id === id) {
        this._films[i] = newFilmInfo;
        this._dataChangeHandler();
        return true;
      }
      return false;
    });
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandler = handler;
  }
}

export default FilmsModel;
