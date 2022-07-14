import { AbstractControl, ValidationErrors } from"@angular/forms";

export class TextValidator{
 
    static noSpaceAllowed(control:AbstractControl) : ValidationErrors |null{
        // != -1 means in contains space
        if((control.value as string).indexOf('') != -1){
            //fire validator
            return {noSpaceAllowed :true};
        }
        else{
            return null;
        }
    }
}
