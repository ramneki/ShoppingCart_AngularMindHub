import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/shared/helpers/must-match-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
  nonWhitespaceRegExp: RegExp = new RegExp("\\S");
registration:FormGroup;
  FormBuilder: any;
  submitted:boolean=false;
  chkTerms: boolean = false;
  invaliidcheck: boolean = false;
  constructor(  private formBuilder:FormBuilder,
    private router: Router,
    private authserice:AuthService) {
    
   }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(){
this.registration=this.formBuilder.group({
  UserName:['',[Validators.required,Validators.pattern(this.nonWhitespaceRegExp)]],
  Email:['',[Validators.required, Validators.pattern(this.emailPattern)]],
  Password:['',[Validators.required,,Validators.pattern(this.nonWhitespaceRegExp)]],
  CnfPassword:['',Validators.required],
  FirstName: ['', [Validators.required,Validators.pattern(this.nonWhitespaceRegExp)]],
  LastName:  ['', [Validators.required,,Validators.pattern(this.nonWhitespaceRegExp)]],
  Phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
 // RememberMe:[false, Validators.requiredTrue],
},
{
  validator: MustMatch('Password', 'CnfPassword'),
}
) }
get f() {
  return this.registration.controls;
}

signup(){
  debugger
  this.submitted = true;
  if(this.registration.invalid){
    return;
  }
  if (this.chkTerms === false) {
    this.invaliidcheck = true;
    return;
  }
   else {
    const payload = {
      UserName: this.f.UserName.value,
      Password: this.f.Password.value,
      FirstName: this.f.FirstName.value,
      LastName: this.f.LastName.value,
      Phone: this.f.Phone.value,
      Email: this.f.Email.value,
    };
    this.authserice.signup(payload).subscribe(
      data => {
        debugger
       alert("registration successfully Done");
       this.router.navigate(['/auth/login']);
      },
      error => {
        alert(error.error)
      }
    );
  }
}
oncheck() {
  this.chkTerms = this.chkTerms === false ? true : false;
  if (this.chkTerms === true) {
    this.invaliidcheck = false;
  }
}

 UserCheck(event:any){
  let username=event.target.value;
  debugger
  if(username!=null && username!='' && username!=undefined){
    this.authserice.UserCheck(username).pipe( debounceTime(100000) ).subscribe(
      data => {
        debugger
       //alert("registration sucess");
      },
      error => {
        alert(error.error)
      }
    );
   
  }
}
}
