function e(e,t,i,r){Object.defineProperty(e,t,{get:i,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},s=i.parcelRequire7e89;null==s&&((s=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return r[e]=i,t.call(i.exports,i,i.exports),i.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},i.parcelRequire7e89=s),s.register("27Lyk",function(t,i){"use strict";e(t.exports,"register",()=>r,e=>r=e),e(t.exports,"resolve",()=>n,e=>n=e);var r,n,s={};r=function(e){for(var t=Object.keys(e),i=0;i<t.length;i++)s[t[i]]=e[t[i]]},n=function(e){var t=s[e];if(null==t)throw Error("Could not resolve bundle with id "+e);return t}}),s("27Lyk").register(JSON.parse('{"f9fpV":"index.4d3c0af2.js","6uuz4":"icon-loading.a5be1851.png","dVxFZ":"icon-timer.cecb995d.png"}'));const a=async function(e){try{let t=await Promise.race([fetch(e),new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),i=await t.json();if(!t.ok)throw Error(`${i.message}`);return i}catch(e){throw e}},l={recipe:{},recipeList:[],page:1},c=async function(e){try{let t=await a(`https://forkify-api.herokuapp.com/api/v2/recipes/${e}`),{recipe:i}=t.data;l.recipe={id:i.id,title:i.title,publisher:i.publisher,source_url:i.source_url,image_url:i.image_url,servings:i.servings,cooking_time:i.cooking_time,ingredients:i.ingredients.map(e=>{if(!e.quantity)return e;let t=parseFloat(e.quantity)/Number(i.servings);return{...e,scalingOffset:t}})}}catch(e){throw e.message}},d=async function(e){try{let t=await a(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${e}`);l.recipeList.length=0,l.page=1,l.recipeList=t.data.recipes}catch(e){throw e.message}};var o={};o=new URL(s("27Lyk").resolve("6uuz4"),import.meta.url).toString();var p={};p=new URL(s("27Lyk").resolve("dVxFZ"),import.meta.url).toString();class u{#e=document.querySelector(".recipe");#t;#i="Couldn't load the recipe. Please, try again.";render(e){this.#t=e;let t=this.#r();this.#n(),this.#e.insertAdjacentHTML("beforeend",t),this.#s()}#n(){this.#e.innerHTML=""}renderSpinner(){this.#n();let e=new Image;e.src=t(o);let i=document.createElement("div");i.classList.add("spinner"),i.appendChild(e),this.#e.insertAdjacentElement("beforeend",i)}addHandlerRender(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}renderError(e=this.#i){let t=`
		<div class="error">
			<p>${e}</p>
		</div>
		`;this.#n(),this.#e.insertAdjacentHTML("afterbegin",t)}#r(){return`
		<figure class="recipe__fig">
		<img src="${this.#t.image_url}" alt="Tomato" class="recipe__img" />
		<h1 class="recipe__title">
			<span>${this.#t.title}</span>
		</h1>
		</figure>
		<div class="recipe__details">
			<div class="recipe__info">
				<span class="recipe__info-data recipe__info-data--minutes">${this.#t.cooking_time}</span>	
				<span class="recipe__info-text">minutes</span>
				<img src=${t(p)}></img>
			</div>
			<div class="recipe__info">
				<span class="recipe__info-data recipe__info-data--people">${this.#t.servings}</span>
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
				${this.#a()}
			</ul>
		</div>
		<div class="recipe__directions">
			<h2 class="heading--2">How to cook it</h2>
			<p class="recipe__directions-text">
				This recipe was carefully designed and tested by
				<span class="recipe__publisher">
				${this.#t.publisher}</span>. Please check out
				directions at their website.
			</p>
			<a
				class="btn--small recipe__btn"
				href="${this.#t.source_url}"
				target="_blank"
			>
				<span>Directions</span>
				<span>&#8599;</span>
			</a>
		</div>`}#a(){return this.#t.ingredients.map((e,t)=>`
		<li class="recipe__ingredient">
		  ${e.quantity?`<div class="recipe__quantity">${e.quantity}</div>`:""}
		  <div class="recipe__description">
			<span class="recipe__unit">${e.unit}</span>
			${e.description}
		  </div>
		</li>`).join("")}#l(e){if(1>=Number(this.#t.servings)&&-1===e||this.#t.servings>=50&&1===e)return;this.#t.servings=(Number(this.#t.servings)+e).toString();let t=this.#t.ingredients.map(e=>{if(!e.quantity)return e;let t=parseFloat(e.scalingOffset),i=t*Number(this.#t.servings);return{...e,quantity:i.toString()}});this.#t.ingredients=t,this.render(this.#t)}#s(){let e=document.querySelector(".recipe__info-buttons"),t=e.querySelector(".plus"),i=e.querySelector(".minus");t.addEventListener("click",()=>this.#l(1)),i.addEventListener("click",()=>this.#l(-1))}}var g=new u;class h{#e=document.querySelector(".results");#t;render(e){this.#t=e;let t=this.#r();this.#n(),this.#e.insertAdjacentHTML("beforeend",t)}renderNoResultsError(){this.#n(),this.#e.insertAdjacentHTML("beforeend","<div class='empty-result-message'> 'No results for your query, please try again.'</div>")}#n(){this.#e.innerHTML=""}#r(){return this.#t.map(e=>`<li class="preview">
        <a class="preview__link" href="#${e.id}">
          <figure class="preview__fig">
            <img src="${e.image_url}" alt="recipe_img" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              ${e.title}
            </h4>
            <p class="preview__publisher">${e.publisher}</p>
          </div>
        </a>
      </li>`).join("")}addEventHandler(e){document.querySelector(".search__btn").addEventListener("click",t=>{t.preventDefault(),e()})}updatePaginationButtons(e,t){let i=document.querySelector(".pagination__btn--prev"),r=document.querySelector(".pagination__btn--next"),n=document.querySelector(".pagination__page-number");n.value=e,n.max=t,t>1?(n.style.visibility="visible",i.style.visibility="visible",r.style.visibility="visible"):(n.style.visibility="hidden",i.style.visibility="hidden",r.style.visibility="hidden"),1===e?i.setAttribute("disabled",!0):i.removeAttribute("disabled"),e===t?r.setAttribute("disabled",!0):r.removeAttribute("disabled")}}var _=new h;const v=document.querySelector(".pagination__btn--prev"),f=document.querySelector(".pagination__btn--next"),m=document.querySelector(".search__field");m.focus();let b=!1;const y=async function(e){if(!b){b=!0;try{let e=window.location.hash.slice(1)||null;if(!e)return;g.renderSpinner(),await c(e),g.render(l.recipe)}catch(e){g.renderError(e)}}b=!1},w=async function(e,t=1){try{if(!e){let e=m.value;if(!e)return;await d(e)}if(!l.recipeList.length){_.renderNoResultsError();return}let i=Math.ceil(l.recipeList.length/10);_.updatePaginationButtons(t,i);let r=(t-1)*10,n=10*t;_.render(l.recipeList.slice(r,n))}catch(e){throw e}};g.addHandlerRender(y),_.addEventHandler(w),v.addEventListener("click",()=>{l.page>1&&(l.page--,w(l.recipeList,l.page))}),f.addEventListener("click",()=>{l.page<l.recipeList.length/10&&(l.page++,w(l.recipeList,l.page))}),l.page=1;
//# sourceMappingURL=index.4d3c0af2.js.map
