import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipesChanged=new Subject<Recipe[]>();
 
    recipes:Recipe[]=[
        new Recipe("Tasty Dosa","Tasty Variety of dosa","https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg",[new Ingredient('flour',5),
    new Ingredient('onion',10)]),
        new Recipe("Delicious Briyani","Wonderful briyani","https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg",[new Ingredient('meat',8),new Ingredient('ginger',1)])
        
      ];
//recipes:Recipe[]=[];
      constructor(private slService:ShoppingListService){}
      setRecipes(recipes:Recipe[]){
this.recipes=recipes;
this.recipesChanged.next(this.recipes.slice());
      }
      getRecipes(){
          return this.recipes.slice();
      }
      getRecipe(index:number){
return this.recipes[index];
      }
      addRecipeToShopping(ingredients:Ingredient[]){
this.slService.addShoppingIngredients(ingredients);
      }
      addRecipe(recipe:Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
this.recipes[index]=newRecipe;
this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
this.recipes.splice(index,1);
this.recipesChanged.next(this.recipes.slice());
      }
    
}