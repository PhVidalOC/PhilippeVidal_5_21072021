/**
 * GENERATION DES CARTES DE RECETTES
 */
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
    } ${element.unit ? element.unit : element.unite ? element.unite : ""}
        </span>
                    </li>`;
  });
  return ingredientLi;
}

/**
 * LISTE INGREDIENTS
 */
const containerSearch = document.getElementById("ingr-search-list");
const ingredientsArray = searchIngredients(recipes);
ingredientsArray.forEach((ingredient) => {
  containerSearch.innerHTML += `<li>${ingredient}</li>`;
});

/**
 * Fonction pour constitution de liste d'ingrédients
 * @param {*} ingredientsSearchList 
 * @returns 
 */
function searchIngredients(ingredientsSearchList) {
  let tabIngr = [];
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
const appliancesArray = searchAppliances(recipes);
appliancesArray.forEach((appliance) => {
  containerSearchB.innerHTML += `<li>${appliance}</li>`;
});

/**
 * fonction pour constitution liste d'appareils
 * @returns 
 */
function searchAppliances() {
  let tabApplia = [];
  recipes.forEach((recette) => {
    if (
      !tabApplia.find(
        (i) => Utils.normScripture(i) === Utils.normScripture(recette.appliance)
      )
    ) {
      tabApplia.push(recette.appliance);
    }
  });
  tabApplia.sort(Intl.Collator().compare);
  return tabApplia;
}


/**
 * LISTE USTENSILES
 */
const containerSearchC = document.getElementById("ust-search-list");
const ustensilsArray = searchUstensils(recipes);
ustensilsArray.forEach((ustensils) => {
  containerSearchC.innerHTML += `<li>${ustensils}</li>`;
});

/**
 * fonction pour constitution de liste d'ustensiles
 * @returns 
 */
function searchUstensils() {
  let tabUstensils = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const index = tabUstensils.findIndex(
        (i) =>
          Utils.normScripture(i) === Utils.normScripture(ustensil)
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


document.getElementById("ingr-search-list").style.display = "none"
document.getElementById("ingr-chevron-up").style.display = "none"
document.getElementById("applia-chevron-up").style.display = "none"
document.getElementById("ust-chevron-up").style.display = "none"
document.getElementById("applia-search-list").style.display = "none"
document.getElementById("ust-search-list").style.display = "none"


/**
 * fonction pour clic de la liste d'ingrédients
 */
function showingredientsfilter() {
  if (document.getElementById("ingr-search-list").style.display === "none"){
    document.getElementById("ingr-search-list").style.display = "grid"
    document.getElementById("ingr-chevron-up").style.display = "block"

    document.getElementById("title-ingredient").type ="search"
    document.getElementById("title-ingredient").placeholder ="Recherche un ingrédient"
    document.getElementById("title-ingredient").size ="30"


    document.getElementById("ingr-chevron-down").style.display = "none"
    document.getElementById("applia-search-list").style.display = "none"
    document.getElementById("applia-chevron-up").style.display = "none"
    document.getElementById("applia-chevron-down").style.display = "block"
    document.getElementById("ust-search-list").style.display = "none"
    document.getElementById("ust-chevron-up").style.display = "none"
    document.getElementById("ust-chevron-down").style.display = "block"
  } else {
    document.getElementById("ingr-search-list").style.display = "none"

    document.getElementById("title-ingredient").type ="text"
    document.getElementById("title-ingredient").placeholder ="Ingrédients"
    document.getElementById("title-ingredient").size ="20"

    document.getElementById("ingr-chevron-down").style.display = "block"
    document.getElementById("ingr-chevron-up").style.display = "none"

    document.getElementById("title-ingredient").style.display = "block"
  }
}


/**
 * fonction pour clic de la liste d'appareils
 */
function showappliancefilter() {
  if (document.getElementById("applia-search-list").style.display === "none"){
    document.getElementById("applia-search-list").style.display = "block"
    document.getElementById("applia-chevron-up").style.display = "block"
    document.getElementById("applia-chevron-down").style.display = "none"
    document.getElementById("ingr-search-list").style.display = "none"
    document.getElementById("ingr-chevron-up").style.display = "none"
    document.getElementById("ingr-chevron-down").style.display = "block"

    document.getElementById("title-ingredient").type ="text"
    document.getElementById("title-ingredient").placeholder ="Ingrédients"
    
    document.getElementById("ust-search-list").style.display = "none"
    document.getElementById("ust-chevron-up").style.display = "none"
    document.getElementById("ust-chevron-down").style.display = "block"
  } else {
    document.getElementById("applia-search-list").style.display = "none"
    document.getElementById("applia-chevron-down").style.display = "block"
    document.getElementById("applia-chevron-up").style.display = "none"
  }
}

/**
 * fonction pour clic de la liste d'ustensiles
 */
function showustensilfilter() {
  if (document.getElementById("ust-search-list").style.display === "none"){
    document.getElementById("ust-search-list").style.display = "block"
    document.getElementById("ust-chevron-up").style.display = "block"
    document.getElementById("ust-chevron-down").style.display = "none"
    document.getElementById("ingr-search-list").style.display = "none"
    document.getElementById("ingr-chevron-up").style.display = "none"
    document.getElementById("ingr-chevron-down").style.display = "block"

    document.getElementById("title-ingredient").type ="text"
    document.getElementById("title-ingredient").placeholder ="Ingrédients"

    document.getElementById("applia-search-list").style.display = "none"
    document.getElementById("applia-chevron-up").style.display = "none"
    document.getElementById("applia-chevron-down").style.display = "block"

  } else {
    document.getElementById("ust-search-list").style.display = "none"
    document.getElementById("ust-chevron-down").style.display = "block"
    document.getElementById("ust-chevron-up").style.display = "none"
  }
}

// function unitLength(unitLng){
//   switch (unitLng) {
//       case "grammes":
//           return "g"
//       case "cuillères à soupe":
//           return "CàS"
//       case "cuillère à soupe":
//           return "CàS"
//       case "litres":
//           return "l"
//       case "litre":
//           return "l"
//       default:
//           return unitLng
//   }
// }


//RECHERCHE SUGGESTION
// const ingredients = [tableau de valeur à écouter];
// const searchinput = document.getElementById('serarchinput');

// searchinput.addEventListener('keyup', function(){
//   const input = searchinput.value;
//   const result = pesrons.fiulter(item => item.name.toLowerCase().includes(input.toLowerCase()));
//   let suggestion = '';
//   if (input !=''){
//     result.forEach(resultItem =>
//       suggestion +='
//       <div class="suggestion">${resultItem.name}</div>
//       '
//       )
//   }
//   document.getElementById('suggestion').innerHTML = suggestion;
// })




