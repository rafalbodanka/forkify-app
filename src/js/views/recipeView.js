import iconLoading from "../../img/icon-loading.png"
import iconTimer from "../../img/icon-timer.png"

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage = "Couldn't load the recipe. Please, try again.";

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
	this.#addChangeServingsListeners();
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
	this.#clear();
  
	const img = new Image();
	img.src = iconLoading;
  
	const spinner = document.createElement('div');
	spinner.classList.add('spinner');
	spinner.appendChild(img);
  
	this.#parentElement.insertAdjacentElement('beforeend', spinner);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  renderError(message = this.#errorMessage) {
    const markup = `
		<div class="error">
			<p>${message}</p>
		</div>
		`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup() {
    return `
		<figure class="recipe__fig">
		<img src="${this.#data.image_url}" alt="Tomato" class="recipe__img" />
		<h1 class="recipe__title">
			<span>${this.#data.title}</span>
		</h1>
		</figure>
		<div class="recipe__details">
			<div class="recipe__info">
				<span class="recipe__info-data recipe__info-data--minutes">${
				this.#data.cooking_time
				}</span>	
				<span class="recipe__info-text">minutes</span>
				<img src=${iconTimer}></img>
			</div>
			<div class="recipe__info">
				<span class="recipe__info-data recipe__info-data--people">${
        this.#data.servings
        }</span>
				<span class="recipe__info-text">servings</span>
				<div class="recipe__info-buttons">
					<button class="btn--tiny plus">
					+
					</button>
					<button class="btn--tiny minus">
					-
					</button>
				</div>
			</div>
		</div>
		<div class="recipe__ingredients">
			<h2 class="heading--2">Recipe ingredients</h2>
			<ul class="recipe__ingredient-list">
				${this.#generateMarkupIngredients()}
			</ul>
		</div>
		<div class="recipe__directions">
			<h2 class="heading--2">How to cook it</h2>
			<p class="recipe__directions-text">
				This recipe was carefully designed and tested by
				<span class="recipe__publisher">
				${this.#data.publisher}</span>. Please check out
				directions at their website.
			</p>
			<a
				class="btn--small recipe__btn"
				href="${this.#data.source_url}"
				target="_blank"
			>
				<span>Directions</span>
				<span>&#8599;</span>
			</a>
		</div>`;
  }

  #generateMarkupIngredients() {
	return this.#data.ingredients
	  .map((ing, index) => `
		<li class="recipe__ingredient">
		  ${
			ing.quantity
			  ? `<div class="recipe__quantity">${ing.quantity}</div>`
			  : ''
		  }
		  <div class="recipe__description">
			<span class="recipe__unit">${ing.unit}</span>
			${ing.description}
		  </div>
		</li>`
	  )
	  .join('');
  }


  #updateServings(number) {
	if ((Number(this.#data.servings) <= 1 && number === -1) || (this.#data.servings >= 50 && number === 1)) return
	this.#data.servings = (Number(this.#data.servings) + number).toString();
	const adjustedIngredients = this.#data.ingredients.map((ing) => {
	  if (!ing.quantity) return ing;
  
	  const scalingOffset = parseFloat(ing.scalingOffset);
	  const adjustedQuantity = scalingOffset * Number(this.#data.servings);
  
	  return { ...ing, quantity: adjustedQuantity.toString() };
	});
  
	this.#data.ingredients = adjustedIngredients;
	this.render(this.#data);
  }

  #addChangeServingsListeners() {
	const buttons = document.querySelector('.recipe__info-buttons')
	const servingsIncremenetButton = buttons.querySelector('.plus')
	const servingsDecremenetButton = buttons.querySelector('.minus')
	servingsIncremenetButton.addEventListener('click', () => this.#updateServings(1));
	servingsDecremenetButton.addEventListener('click', () => this.#updateServings(-1));
	}

}

export default new RecipeView();
