class RecipeListView {
  #parentElement = document.querySelector('.results');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderNoResultsError() {
    this.#clear();
    const markup = `<div class='empty-result-message'> 'No results for your query, please try again.'</div>`;
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup() {
    return this.#data
      .map(recipe => {
        return `<li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image_url}" alt="recipe_img" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              ${recipe.title}
            </h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>`;
      })
      .join('');
  }

  addEventHandler(handler) {
    document.querySelector('.search__btn').addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  updatePaginationButtons(currentPage, totalPages) {
    const prevBtn = document.querySelector('.pagination__btn--prev');
    const nextBtn = document.querySelector('.pagination__btn--next');
    const pageNum = document.querySelector('.pagination__page-number');
    pageNum.value = currentPage;
    pageNum.max = totalPages;

    if (totalPages > 1) {
      pageNum.style.visibility = 'visible';
      prevBtn.style.visibility = 'visible';
      nextBtn.style.visibility = 'visible';
    } else {
      pageNum.style.visibility = 'hidden';
      prevBtn.style.visibility = 'hidden';
      nextBtn.style.visibility = 'hidden';
    }

    if (currentPage === 1) {
      prevBtn.setAttribute('disabled', true);
    } else {
      prevBtn.removeAttribute('disabled');
    }

    if (currentPage === totalPages) {
      nextBtn.setAttribute('disabled', true);
    } else {
      nextBtn.removeAttribute('disabled');
    }
  }
}

export default new RecipeListView();
