/**
 * VARIABLES
 */
let tabIngr = [];
let tabApplia = [];
let tabUstensils = [];
let tabTagArea = [];
// let tabTagApplia = [];
// let tabTagUst = [];

/**
 * CONSTANTES
 */
const ingredientsArray = searchIngredients(recipes);
const appliancesArray = searchAppliances(recipes);
const ustensilsArray = searchUstensils(recipes);

/**
 * GENERATION DES CARTES DE RECETTES
 */
displayRecipes(recipes);

function displayRecipes(recipesList) {
  const container = document.getElementById("recipes-list");
  for (let i = 0; i < recipes.length; i++) {
    const card = `<div id="${recipes[i].id}" class="recipe-block">
            <div class="recipe-block__img"></div>
            <div class="recipe">
              <div class="recipe__titleTime">
                <h2 class="recipe__titleTime__title name">
                  ${recipes[i].name}
                </h2>
                <h2 class="recipe__titleTime__time">
                  <img
                    src="images/icon/clock-circle.svg"
                    alt="icone temps"
                    class="icon recipe__titleTime__time--icon"
                  />
                  ${recipes[i].time} min
                </h2>
              </div>
              <div class="ingredients-description">
                <div class="Ingredients">
                  <ul class="ingredients-list">
                    ${getIngredients(recipes[i].ingredients)}
                    
                  </ul>
                </div>
                <div class="description">
                  <p class="description__text">
                    ${
                      recipes[i].description.length < 300
                        ? recipes[i].description
                        : recipes[i].description.substring(0, 70) + "..."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>`;
    container.innerHTML += card;
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
const containerSearch = document.getElementById("ingr-search-list");
// const ingredientsArray = searchIngredients(recipes);
ingredientsArray.forEach((ingredient) => {
  containerSearch.innerHTML += `<li>${ingredient}</li>`;
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
  containerSearchB.innerHTML += `<li>${appliance}</li>`;
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
  containerSearchC.innerHTML += `<li>${ustensils}</li>`;
});

/**
 * Input texte et filtre ingrédients
 */
const tagIngr = document.getElementById("tag-area-ingr");
const inputIngr = document.getElementById("input-ingredient");
inputIngr.addEventListener("keyup", (e) => {
  const ingrValue = e.target.value;
  let inputValue = "";
  ingredientsArray.forEach((element) => {
    if (element.toLowerCase().includes(ingrValue.toLowerCase())) {
      inputValue += `<li class"input-value" onclick = "addTagIngr(this)">${element}</li>`;
    }
  });
  document.getElementById("ingr-search-list").innerHTML = inputValue;
  console.log(tabTagArea)
});

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
    console.log(tabTagArea)
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
  console.log(tabTagArea)
})

/**
 * Ajout Tag ingredients
 * @param {*} inputValue 
 */
function addTagIngr(inputValue) {
  let inputTag = "";
  tabTagArea.push({
    type: "ingredient",
    value: inputValue
  })
  inputTag += `<div id="tag-ingredient" class="ingredient-tag" onclick = "removeTag(this)">
  <p class="tag">
  ${inputValue.innerText}<img
    src="images/icon/circlecroix.svg"
    alt="icone cercle avec croix"
    class="tag__icon"
   />
    </p></>`;
  tagIngr.innerHTML += inputTag;
  // removeElement(tabIngr, inputTag);
  filterRecipes()
}


function filterRecipes() {
  //si TabTagArrea, (type & value, ingredients, appareile, ustensils) inclus dans recipes, 
  //alors afficher recipes ayant tous les tags selectionnés éléments
  console.log(tabTagArea)
}


function removeTag(el){
  el.style.display = "none"
  const tagName = el.innerText;
  const index = tabTagArea.findIndex(tag=>{
    return tag.value === tagName
  })
  if (index!==-1){
    tabTagArea.splice(index,1)
  }
  filterRecipes()
  // console.log(tabTagArea)
}

function removeElement(tab, searchElement) {
  for(let i = 0; i < tab.length; i++){
      if (tab[i] == searchElement) {
          tab.splice(i,1); // splice(index_debut_suppr, nombre_element_a_suppr)
          break;
      }
  }
}

/**
 * Ajout Tag appareil
 * @param {*} inputValue 
 */
function addTagApplia(inputValue) {
  let inputTag = "";
  tabTagArea.push({
    type: "appliance",
    value: inputValue
  })
  inputTag += `<div id="tag-appliance" class="appliance-tag" onclick = "removeTag(this)">
  <p class="tag">
  ${inputValue.innerText}<img
    src="images/icon/circlecroix.svg"
    alt="icone cercle avec croix"
    class="tag__icon"
   />
    </p></>`;
    tagApplia.innerHTML += inputTag;
    filterRecipes()
}
// console.log(tabApplia)

/**
 * Ajoiut Tag ustensiles
 * @param {*} inputValue 
 */
function addTagUst(inputValue) {
  //push et créer tableau des tags
  let inputTag = "";
  tabTagArea.push({
    type: "ustensil",
    value: inputValue
  })
  inputTag += `<div id="tag-ustensil" class="ustensil-tag" onclick = "removeTag(this)">
  <p class="tag">
  ${inputValue.innerText}<img
    src="images/icon/circlecroix.svg"
    alt="icone cercle avec croix"
    class="tag__icon"
   />
    </p></>`;
    tagUst.innerHTML += inputTag;
    filterRecipes()
}
// console.log(tabTagArea)
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
