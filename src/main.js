import {genCardMockList} from './mock/film.js';
import {render} from './utils/render.js';
import PageController from './controllers/pageController.js';
import FilmsModel from './models/filmsModel.js';
import Rank from './components/rank.js';
import FilterController from './controllers/filterController.js';

const FILMS_COUNT = 21;
const WATCHED_FILMS = 10;

const films = genCardMockList(FILMS_COUNT);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const header = document.querySelector(`.header`);
const rank = new Rank(WATCHED_FILMS);
render(rank, header);

const main = document.querySelector(`.main`);
const filterController = new FilterController(filmsModel, main);
filterController.render();


const pageController = new PageController(filmsModel, main);
pageController.render();
