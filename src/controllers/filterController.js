import Filter from '../components/filter.js';
import {render, replaceComponent} from '../utils/render.js';

class FilterController {
  constructor(filmsModel, container) {
    this._filmsModel = filmsModel;
    this._container = container;

    this._filter = null;
  }

  render() {
    const films = this._filmsModel.getFilms();
    this._filter = new Filter(films);

    render(this._filter, this._container);

    this._filmsModel.setDataChangeHandler(() => {
      const oldFilter = this._filter;

      const newFilms = this._filmsModel.getFilms();
      this._filter = new Filter(newFilms);

      replaceComponent(this._filter, oldFilter);
    });
  }
}

export default FilterController;
