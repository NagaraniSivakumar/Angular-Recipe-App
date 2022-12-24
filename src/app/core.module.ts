import { NgModule } from "@angular/core";
import { LoggingService } from "./logging.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers:[
        ShoppingListService,
        RecipeService,
       // LoggingService
    ]
})
export class CoreModule{

}