/**
 * VARIABLES
 */
let tabIngr = [];
let tabApplia = [];
let tabUstensils = [];
let tabTagArea = [];

/**
 * CONSTANTES
 */
const ingredientsArray = searchIngredients(recipes);
const containerSearch = document.getElementById("ingr-search-list");
const appliancesArray = searchAppliances(recipes);
const ustensilsArray = searchUstensils(recipes);

displayRecipes(recipes);

//RECHERCHE DANS LA SEARCH BAR
document.getElementById("search-element").addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  if (searchValue.length > 2) {
    const searchRecipes = recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchValue) ||
        recipe.ingredients.some((i) =>
          i.ingredient.toLowerCase().includes(searchValue)
        ) ||
        recipe.appliance.toLowerCase().includes(searchValue) ||
        recipe.ustensils.some((u) => u.toLowerCase().includes(searchValue))
      );
    });
    displayRecipes(searchRecipes);
    console.log(searchRecipes);
  } else {
    displayRecipes(recipe);
  }
  console.log(ingredientsArray);
});

// /**
//  * GENERATION DES CARTES DE RECETTES
//  */
function displayRecipes(recipesArray) {
  const container = document.getElementById("recipes-list");
  container.innerHTML = "";
  for (let i = 0; i < recipesArray.length; i++) {
    const card = `<div id="${recipesArray[i].id}" class="recipe-block">
            <div class="recipe-block__img"></div>
            <div class="recipe">
              <div class="recipe__titleTime">
                <h2 class="recipe__titleTime__title name">
                  ${recipesArray[i].name}
                </h2>
                <h2 class="recipe__titleTime__time">
                  <img
                    src="images/icon/clock-circle.svg"
                    alt="icone temps"
                    class="icon recipe__titleTime__time--icon"
                  />
                  ${recipesArray[i].time} min
                </h2>
              </div>
              <div class="ingredients-description">
                <div class="Ingredients">
                  <ul class="ingredients-list">
                    ${getIngredients(recipesArray[i].ingredients)}
                    
                  </ul>
                </div>
                <div class="description">
                  <p class="description__text">
                    ${
                      recipesArray[i].description.length < 350
                        ? recipesArray[i].description
                        : recipesArray[i].description.substring(0, 70) + "..."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>`;
    container.innerHTML += card;
    // console.log(container)
  }
}

/**
 * Fonction pour insertions d'éléments des cartes recettes
 * @param {*} ingredientsList
 * @returns
 */
function getIngredients(ingredientsList) {
  let ingredientLi = "";
  ingredientsList.forEach((element) => {
    ingredientLi += `   <li class="ingredient">
                      ${
                        element.ingredient
                      }: <span class="ingredient__quantity">${
      element.quantite
        ? element.quantite
        : element.quantity
        ? element.quantity
        : ""
    } ${scriptUnit(
      element.unit ? element.unit : element.unite ? element.unite : ""
    )}
        </span>
                    </li>`;
  });
  return ingredientLi;
}
function scriptUnit(unitLng) {
  switch (unitLng) {
    case "grammes":
      return "g";
    case "cuillères à soupe":
      return "cas";
    case "cuillère à soupe":
      return "cas";
    case "litres":
      return "l";
    case "litre":
      return "l";
    default:
      return unitLng;
  }
}

/**
 * LISTE INGREDIENTS
 */
// const containerSearch = document.getElementById("ingr-search-list");
// const ingredientsArray = searchIngredients(recipes);
ingredientsArray.forEach((ingredient) => {
  containerSearch.innerHTML += `<li onclick = "addTagIngr(this)">${ingredient}</li>`;
});

/**
 * Fonction pour constitution de liste d'ingrédients
 * @param {*} ingredientsSearchList
 * @returns
 */
function searchIngredients(ingredientsSearchList) {
  // let tabIngr = [];
  ingredientsSearchList.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const index = tabIngr.findIndex(
        (i) =>
          Utils.normScripture(i) === Utils.normScripture(ingredient.ingredient)
      );
      if (index === -1) {
        tabIngr.push(ingredient.ingredient.toLowerCase());
      }
    });
  });
  // console.log(tabIngr)
  tabIngr.sort(Intl.Collator().compare);
  return tabIngr;
}

/**
 * LISTE APPAREILS
 */
const containerSearchB = document.getElementById("applia-search-list");
// const appliancesArray = searchAppliances(recipes);
appliancesArray.forEach((appliance) => {
  containerSearchB.innerHTML += `<li onclick = "addTagApplia(this)">${appliance}</li>`;
});

/**
 * fonction pour constitution liste d'appareils
 * @returns
 */
function searchAppliances() {
  // let tabApplia = [];
  recipes.forEach((recette) => {
    if (
      !tabApplia.find(
        (i) => Utils.normScripture(i) === Utils.normScripture(recette.appliance)
      )
    ) {
      tabApplia.push(recette.appliance.toLowerCase());
    }
  });
  tabApplia.sort(Intl.Collator().compare);
  return tabApplia;
}

/**
 * LISTE USTENSILES
 */
const containerSearchC = document.getElementById("ust-search-list");
// const ustensilsArray = searchUstensils(recipes);
ustensilsArray.forEach((ustensils) => {
  containerSearchC.innerHTML += `<li onclick = "addTagUst(this)">${ustensils}</li>`;
});

/**
 * Input texte et filtre ingrédients
 */
const tagIngr = document.getElementById("tag-area-ingr");
const inputIngr = document.getElementById("input-ingredient");
inputIngr.addEventListener("keyup", (e) => {
  const ingrValue = e.target.value.toLowerCase();
  let inputValue = "";
  ingredientsArray.forEach((element) => {
    if (element.toLowerCase().includes(ingrValue.toLowerCase())) {
      inputValue += `<li class"input-value" onclick = "addTagIngr(this)">${element}</li>`;
    }
  });
  document.getElementById("ingr-search-list").innerHTML = inputValue;
});
// console.log(tabTagArea)

const tagApplia = document.getElementById("tag-area-applia");
const inputApplia = document.getElementById("input-appareils");
inputApplia.addEventListener("keyup", (e) => {
  const appliaValue = e.target.value;
  let inputValue = "";
  appliancesArray.forEach((element) => {
    if (element.toLowerCase().includes(appliaValue.toLowerCase())) {
      inputValue += `<li class"input-value" onclick = "addTagApplia(this)">${element}</li>`;
    }
  });
  document.getElementById("applia-search-list").innerHTML = inputValue;
  // console.log(tabTagArea)
});

const tagUst = document.getElementById("tag-area-ust");
const inputUst = document.getElementById("input-ustensils");
inputUst.addEventListener("keyup", (e) => {
  const ustValue = e.target.value;
  let inputValue = "";
  ustensilsArray.forEach((element) => {
    if (element.toLowerCase().includes(ustValue.toLowerCase())) {
      inputValue += `<li class"input-value" onclick = "addTagUst(this)">${element}</li>`;
    }
  });
  document.getElementById("ust-search-list").innerHTML = inputValue;

  // console.log(tabTagArea)
});

/**
 * Ajout Tag ingredients
 * @param {*} inputValue
 */
function addTagIngr(inputValue) {
  let inputTag = "";
  let tagName = inputValue.innerText;

  tabTagArea.push({
    type: "ingredient",
    value: tagName,
  });

  inputTag += `<div id="tag-ingredient" class="ingredient-tag" onclick = "removeTag(this)">
  <p class="tag">
  ${inputValue.innerText}<img
    src="images/icon/circlecroix.svg"
    alt="icone cercle avec croix"
    class="tag__icon"
   />
    </p></div>`;
  tagIngr.innerHTML += inputTag;

  filterRecipes();

  // console.log(tabTagArea);
  // console.log(tabIngr);
}

// console.log(tabTagArea);

// function filterRecipes() {
//recipes.forEAch(recipes[i]){
//if TabTagArrea.value (ingredients, appareil, ustensils)
//est dans recipes,
//alors afficher recipe ayant tous les value de tags selectionnés
// console.log(tabTagArea)

// recipe.ingredients.forEach((ingredient) => {
// }

// const ustensil = recipe.ustensils.map((u) => u.toLowerCase());
// const oneAppliance = recipe.appliance;
// const name = recipe.name;
// const indexRecipe = resultRecipes.findIndex((r) => (r).id === recipe.id);

function filterRecipes() {
  let resultRecipes = [];
  if (tabTagArea.length === 0) {
    resultRecipes = [...recipes];
  } else
    recipes.forEach((recipe) => {
      const ingredient = recipe.ingredients.map((i) =>
        i.ingredient.toLowerCase()
      );
      const ustensil = recipe.ustensils.map((u) => u.toLowerCase());
      const oneAppliance = recipe.appliance;
      // const name = recipe.name;
      const indexRecipe = resultRecipes.findIndex((r) => r.id === recipe.id);
      // console.log(oneAppliance);
      tabTagArea.forEach((tag) => {
        // console.log(tag)
        if (tag.type === "ingredient") {
          if (ingredient.includes(tag.value.toLowerCase())) {
            if (indexRecipe === -1) {
              // Reduce, filter, set
              resultRecipes.push(recipe);
            }
          }
          // console.log(resultRecipes)
        } else if (tag.type === "ustensils") {
          if (ustensil.includes(tag.value.toLowerCase())) {
            if (indexRecipe === -1) {
              resultRecipes.push(recipe);
            }
          }
        } else if (tag.type === "appliance") {
          // console.log(oneAppliance)
          // console.log(tag.value)
          if (oneAppliance.toLowerCase() === tag.value.toLowerCase()) {
            if (indexRecipe === -1) {
              resultRecipes.push(recipe);
            }
          }
          // console.log(resultRecipes.reduce(reducer))
        }
        // console.log(typeof recipe.appliance);
      });
      // console.log(tabTagArea)
    });

  displayRecipes(resultRecipes);
  // console.log(resultRecipes);
  // console.log(tabTagArea);

  // displayRecipes(resultRecipes);
}

/**
 *
 * @param {*} el
 */
function removeTag(el) {
  // console.log(tabTagArea);
  el.style.display = "none";
  const tagName = el.innerText.trim();
  // console.log(tagName);
  const index = tabTagArea.findIndex((tag) => {
    return tag.value === tagName;
  });
  // console.log(tagName);
  // console.log(index);
  if (index !== -1) {
    tabTagArea.splice(index, 1);
  }
  // console.log(tabTagArea);
  filterRecipes();
}

/**
 *
 * Ajout Tag appareil
 * @param {*} inputValue
 */
function addTagApplia(inputValue) {
  let inputTag = "";
  let tagName = inputValue.innerText;
  tabTagArea.push({
    type: "appliance",
    value: tagName,
  });
  inputTag += `<div id="tag-appliance" class="appliance-tag" onclick = "removeTag(this)">
  <p class="tag">
  ${inputValue.innerText}<img
    src="images/icon/circlecroix.svg"
    alt="icone cercle avec croix"
    class="tag__icon"
   />
    </p></div>`;
  tagApplia.innerHTML += inputTag;
  filterRecipes();
  // console.log(tabTagArea);
}

/**
 * Ajout Tag ustensiles
 * @param {*} inputValue
 */
function addTagUst(inputValue) {
  //push et créer tableau des tags
  let inputTag = "";
  let tagName = inputValue.innerText;
  tabTagArea.push({
    type: "ustensils",
    value: tagName,
  });
  inputTag += `<div id="tag-ustensil" class="ustensil-tag" onclick = "removeTag(this)">
  <p class="tag tag-ingr">
  ${inputValue.innerText}<img
    src="images/icon/circlecroix.svg"
    alt="icone cercle avec croix"
    class="tag__icon"
   />
    </p></div>`;
  tagUst.innerHTML += inputTag;
  filterRecipes();
  // console.log(tabTagArea);
}

/**
 * fonction pour constitution de liste d'ustensiles
 * @returns
 */
function searchUstensils() {
  // let tabUstensils = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const index = tabUstensils.findIndex(
        (i) => Utils.normScripture(i) === Utils.normScripture(ustensil)
      );
      if (index === -1) {
        tabUstensils.push(ustensil);
      }
    });
  });
  // console.log(tabIngr)
  tabUstensils.sort(Intl.Collator().compare);
  return tabUstensils;
}

document.getElementById("ingr-search-list").style.display = "none";
document.getElementById("ingr-chevron-up").style.display = "none";
document.getElementById("applia-chevron-up").style.display = "none";
document.getElementById("ust-chevron-up").style.display = "none";
document.getElementById("applia-search-list").style.display = "none";
document.getElementById("ust-search-list").style.display = "none";

/**
 * fonction pour clic de la liste d'ingrédients
 */
function showingredientsfilter() {
  if (document.getElementById("ingr-search-list").style.display === "none") {
    document.getElementById("ingr-search-list").style.display = "grid";
    document.getElementById("ingr-chevron-up").style.display = "block";

    document.getElementById("input-ingredient").type = "search";
    document.getElementById("input-ingredient").placeholder =
      "Recherche un ingrédient";
    // document.getElementById("input-ingredient").size ="20"
    document.getElementById("input-appareils").type = "search";
    document.getElementById("input-appareils").placeholder = "Appareils";
    document.getElementById("input-ustensils").type = "search";
    document.getElementById("input-ustensils").placeholder = "Ustensiles";

    document.getElementById("ingr-chevron-down").style.display = "none";
    document.getElementById("applia-search-list").style.display = "none";
    document.getElementById("applia-chevron-up").style.display = "none";
    document.getElementById("applia-chevron-down").style.display = "block";
    document.getElementById("ust-search-list").style.display = "none";
    document.getElementById("ust-chevron-up").style.display = "none";
    document.getElementById("ust-chevron-down").style.display = "block";
  } else {
    document.getElementById("ingr-search-list").style.display = "none";

    document.getElementById("input-ingredient").type = "text";
    document.getElementById("input-ingredient").placeholder = "Ingrédients";
    // document.getElementById("input-ingredient").size ="20"

    document.getElementById("ingr-chevron-down").style.display = "block";
    document.getElementById("ingr-chevron-up").style.display = "none";

    document.getElementById("input-ingredient").style.display = "block";
  }
}

/**
 * fonction pour clic de la liste d'appareils
 */
function showappliancefilter() {
  if (document.getElementById("applia-search-list").style.display === "none") {
    document.getElementById("applia-search-list").style.display = "block";
    document.getElementById("applia-chevron-up").style.display = "block";

    document.getElementById("input-appareils").type = "search";
    document.getElementById("input-appareils").placeholder =
      "Recherche un appareil";

    document.getElementById("applia-chevron-down").style.display = "none";
    document.getElementById("ingr-search-list").style.display = "none";
    document.getElementById("ingr-chevron-up").style.display = "none";
    document.getElementById("ingr-chevron-down").style.display = "block";

    document.getElementById("input-ingredient").type = "text";
    document.getElementById("input-ingredient").placeholder = "Ingrédients";
    // document.getElementById("input-ingredient").size = "20"
    document.getElementById("input-ustensils").type = "text";
    document.getElementById("input-ustensils").placeholder = "Ustensiles";

    document.getElementById("ust-search-list").style.display = "none";
    document.getElementById("ust-chevron-up").style.display = "none";
    document.getElementById("ust-chevron-down").style.display = "block";
  } else {
    document.getElementById("applia-search-list").style.display = "none";

    document.getElementById("input-appareils").type = "search";
    document.getElementById("input-appareils").placeholder = "Appareils";
    // document.getElementById("input-appareils").size ="20"

    document.getElementById("applia-chevron-down").style.display = "block";
    document.getElementById("applia-chevron-up").style.display = "none";
  }
}

/**
 * fonction pour clic de la liste d'ustensiles
 */
function showustensilfilter() {
  if (document.getElementById("ust-search-list").style.display === "none") {
    document.getElementById("ust-search-list").style.display = "block";
    document.getElementById("ust-chevron-up").style.display = "block";

    document.getElementById("input-ustensils").type = "search";
    document.getElementById("input-ustensils").placeholder =
      "Recherche un ustensile";
    // document.getElementById("input-ustensils").size ="30"

    document.getElementById("ust-chevron-down").style.display = "none";
    document.getElementById("ingr-search-list").style.display = "none";
    document.getElementById("ingr-chevron-up").style.display = "none";
    document.getElementById("ingr-chevron-down").style.display = "block";

    document.getElementById("input-ingredient").type = "text";
    document.getElementById("input-ingredient").placeholder = "Ingrédients";
    document.getElementById("input-ingredient").size = "20";
    document.getElementById("input-appareils").type = "search";
    document.getElementById("input-appareils").placeholder = "Appareils";

    document.getElementById("applia-search-list").style.display = "none";
    document.getElementById("applia-chevron-up").style.display = "none";
    document.getElementById("applia-chevron-down").style.display = "block";
  } else {
    document.getElementById("ust-search-list").style.display = "none";
    document.getElementById("ust-chevron-down").style.display = "block";
    document.getElementById("ust-chevron-up").style.display = "none";
    document.getElementById("input-ustensils").type = "search";
    document.getElementById("input-ustensils").placeholder = "Ustensiles";
    // document.getElementById("input-ustensils").size ="20"
  }
}
