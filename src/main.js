import {genCardMockList} from './mock/film.js';
import PageController from './controllers/pageController.js';

const FILMS_COUNT = 21;

const films = genCardMockList(FILMS_COUNT);

const container = document.body;

const pageController = new PageController(container);
pageController.render(films);
