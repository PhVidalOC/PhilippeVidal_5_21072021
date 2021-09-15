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

const containerSearch = document.getElementById("ingr-search");
const ingredientsArray = searchIngredients(recipes);
ingredientsArray.forEach((ingredient) => {
  containerSearch.innerHTML += `<li>${ingredient}</li>`;
});

function searchIngredients(ingredientsSearchList) {
  let tabIngr = [];
  ingredientsSearchList.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const index = tabIngr.findIndex(
        (i) =>
          Utils.normScripture(i) === Utils.normScripture(ingredient.ingredient)
      );
      if (index === -1) {
        tabIngr.push(ingredient.ingredient);
      }
    });
  });
  // console.log(tabIngr)
  tabIngr.sort();
  return tabIngr;
}

const containerSearchB = document.getElementById("applia-search");
const appliancesArray = searchAppliances(recipes);
appliancesArray.forEach((appliance) => {
  containerSearchB.innerHTML += `<li>${appliance}</li>`;
});

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
  // console.log(tabApplia);
  tabApplia.sort();
  return tabApplia;
}

const containerSearchC = document.getElementById("ustensils-search");
const ustensilsArray = searchUstensils(recipes);
ustensilsArray.forEach((ustensils) => {
  containerSearchC.innerHTML += `<li>${ustensils}</li>`;
});




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
  tabUstensils.sort();
  return tabUstensils;
}



// function showingredientsfilter() {
//   if (document.getElementById("ingr-search-list").style.display === "none"){
//     document.getElementById("ingr-search-list").style.display === "block"
//     document.getElementById("applia-search-list").style.display === "none"
//     document.getElementById("ustensils-search-list").style.display === "none"
//   } else {
//     document.getElementById("ingr-search-list").style.display === "none"
//   }
// }



// function showappliancefilter() {
//   if (document.getElementById("applia-search-list").style.display === "none"){
//     document.getElementById("applia-search-list").style.display === "block"
//     document.getElementById("ingr-search-list").style.display === "none"
//     document.getElementById("ustensils-search-list").style.display === "none"
//   } else {
//     document.getElementById("applia-search-list").style.display === "none"
//   }
// }

function showustensilsfilter() {
  if (document.getElementById("ustensils-search").style.display === "none"){
    document.getElementById("ustensils-search").style.display === "block"
    document.getElementById("ingr-search-list").style.display === "none"
    document.getElementById("applia-search-list").style.display === "none"
  } else {
    document.getElementById("ustensils-search").style.display === "none"
  }
}