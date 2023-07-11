import { RESULTS_SIZE } from './config.js';
import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import RecipeListView from './views/recipeListView.js';
import recipeListView from './views/recipeListView.js';

const prevBtn = document.querySelector('.pagination__btn--prev');
const nextBtn = document.querySelector('.pagination__btn--next');
const searchInput = document.querySelector('.search__field');
searchInput.focus();

let isFetching = false;

const controlRecipes = async function (id) {
  if (!isFetching) {
    isFetching = true;
    try {
      const id = window.location.hash.slice(1) || null;
      if (!id) return;
      RecipeView.renderSpinner();
      await model.loadRecipe(id);
      RecipeView.render(model.state.recipe);
    } catch (err) {
      RecipeView.renderError(err);
    }
  }
  isFetching = false;
};

const listRecipes = async function (list, page = 1) {
  try {
    if (!list) {
      const query = searchInput.value;
      if (!query) return;
      await model.loadSearchResults(query);
    }
    if (!model.state.recipeList.length) {
      recipeListView.renderNoResultsError();
      return;
    }
    const totalPages = Math.ceil(model.state.recipeList.length / RESULTS_SIZE);
    RecipeListView.updatePaginationButtons(page, totalPages);
    const startIndex = (page - 1) * RESULTS_SIZE;
    const endIndex = page * RESULTS_SIZE;
    RecipeListView.render(model.state.recipeList.slice(startIndex, endIndex));
  } catch (err) {
    throw err;
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeListView.addEventHandler(listRecipes);
  prevBtn.addEventListener('click', () => {
    if (model.state.page > 1) {
      model.state.page--;
      listRecipes(model.state.recipeList, model.state.page);
    }
  });
  nextBtn.addEventListener('click', () => {
    if (model.state.page < model.state.recipeList.length / RESULTS_SIZE) {
      model.state.page++;
      listRecipes(model.state.recipeList, model.state.page);
    }
  });
  model.state.page = 1;
};

init();
