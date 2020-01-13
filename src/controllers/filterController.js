import Filter from '../components/filter.js';
import {render, replaceComponent} from '../utils/render.js';
import {FILTERS} from '../const.js';

class FilterController {
  constructor(filmsModel, container) {
    this._filmsModel = filmsModel;
    this._container = container;

    this._filter = null;

    this._filterType = FILTERS.ALL;
  }

  render() {
    const oldFilter = this._filter;

    const films = this._filmsModel.getFilms();
    this._filter = new Filter(films);
    this._filter.setFilterChangeHandler((filterType) => {
      this._filmsModel.changeFilterType(filterType);
      this._filterType = filterType;
    });
    if (oldFilter) {
      replaceComponent(this._filter, oldFilter);
    } else {
      render(this._filter, this._container);
    }


    this._filmsModel.setDataChangeHandler(() => {
      this.render();

      this._filter.setActiveFilter(this._filterType);
    });
  }
}

export default FilterController;
