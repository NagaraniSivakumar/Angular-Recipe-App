import { Directive,HostBinding, HostListener } from "@angular/core";
@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
@HostBinding('class.open') isOpen=false;
    @HostListener('click') toggleOpen(){
        this.isOpen=!this.isOpen;
    }
//dropdown can also be closed by click anywhere outside the page
    // @HostListener('document:click',['$event']) toggleOpen(event:Event){
    //     this.isOpen=this.elRef.nativeElement.contains(event.target)?!this.isOpen:false;
    // }
    // constructor(private elRef:ElementRef){}
}