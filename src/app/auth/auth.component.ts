import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription} from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
    constructor(private authService:AuthService,private router:Router,private cfResolver:ComponentFactoryResolver){}

private closeSub:Subscription;
    isLoginMode=true;
    isLoading=false;
    error:string=null;
    @ViewChild(PlaceHolderDirective) alertHost:PlaceHolderDirective;
    onSwitchMode(){
this.isLoginMode=!this.isLoginMode;
    }
    
    onSubmit(form:NgForm){
if(!form.valid){
    return;
}
const email=form.value.email;
const password=form.value.password;
let authObs:Observable<AuthResponseData>;

this.isLoading=true;
if(this.isLoginMode){
authObs=this.authService.login(email,password);

}
else{

    authObs=this.authService.signUp(email,password);
}
authObs.subscribe(resData=>{
    console.log(resData);
    this.isLoading=false;
    this.router.navigate(['/recipes']);
},errorMessage=>{
   console.log(errorMessage);
   this.error=errorMessage;
   this.showAlert(errorMessage);
    this.isLoading=false;
});

form.reset();
    }
    handlingError(){
        this.error=null;
    }
   
    ngOnDestroy(): void {
        this.closeSub.unsubscribe();
    }
private showAlert(message:string){
const alertCmpFactory=this.cfResolver.resolveComponentFactory(AlertComponent);
const hostViewContainerRef=this.alertHost.viewContainerRef;
hostViewContainerRef.clear();
const componentRef=hostViewContainerRef.createComponent(alertCmpFactory);
componentRef.instance.message=message;
this.closeSub=componentRef.instance.close.subscribe(()=>{
this.closeSub.unsubscribe();
hostViewContainerRef.clear();
});
    }
    
    
}