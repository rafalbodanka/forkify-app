import { API_URL, API_SEARCH_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  recipeList: [],
  page: 1,
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image_url: recipe.image_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients.map(ingredient => {
        if (!ingredient.quantity) return ingredient
        const scalingOffset = parseFloat(ingredient.quantity) / Number(recipe.servings);
        return { ...ingredient, scalingOffset };
      })
    };
  } catch (err) {
    throw err.message;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_SEARCH_URL}=${query}`);

    // clear the previous search results
    state.recipeList.length = 0;
    state.page = 1;

    // assign new recipes
    state.recipeList = data.data.recipes;

  } catch (err) {
    throw err.message;
  }
};
