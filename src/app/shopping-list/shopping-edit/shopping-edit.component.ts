import { Component,OnDestroy,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
subscription: Subscription;
@ViewChild('f') slForm:NgForm;
editedItemIndex:number;
editMode=false;
editedItem:Ingredient;
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editedItem=this.slService.getEditIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }

    );
  }
onSubmit(form:NgForm){
const value=form.value;
const newIngredient=new Ingredient(value.name,value.amount);
if(this.editMode){
  this.slService.updateIngredient(this.editedItemIndex,newIngredient)
}
else{
  this.slService.addIngredient(newIngredient);
}
this.editMode=false;
form.reset();
}
onClear(){
  this.slForm.reset();
  this.editMode=false;
}
onDelete(){
  this.slService.deleteIngredient(this.editedItemIndex);
  this.onClear();
}
ngOnDestroy(): void {
    this.subscription.unsubscribe();
}
}
