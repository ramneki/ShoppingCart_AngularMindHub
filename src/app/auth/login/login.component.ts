import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/data/user';
import { MustMatch } from 'src/app/shared/helpers/must-match-validator';


@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('closeModal') private closeModal: ElementRef;
logindata:FormGroup;
submitted:boolean=false;
users:User[];
forgotpassworddata:FormGroup;
emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
  constructor( private formBuilder:FormBuilder,
    private router: Router,
    private authserice:AuthService
   ) { }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormfgtpass();
  }
  // start login section
  buildForm(){
    this.logindata=this.formBuilder.group({
      UserID:['',Validators.required],
      Password:['',Validators.required]
     
  }) }
    get f() {
      return this.logindata.controls;
    }

    login(){
      debugger
      this.submitted = true;
      if(this.logindata.invalid){
        return;
      }
     
       else {
        const payload = {
          UserName: this.f.UserID.value,
          Password: this.f.Password.value,
          
        };
        this.authserice.login(payload).subscribe(
          (data: any) => {
            debugger
            this.users=data;
            localStorage.setItem('mnd:uid', data.userId);
            localStorage.setItem('mnd:actkn', data.token);
            localStorage.setItem('mnd:uname', data.userName);
            localStorage.setItem('mnd:phone', data.phone);
            localStorage.setItem('mnd:isActive', data.isActive);
               // localStorage.setItem('ctm:reftkn', data);
               this.router.navigate(['/']);
          // alert("Login sucess");
          },
          error => {
            alert(error.error)
          }
        );
      }
    }
// end login section


    // start forgot password section
    buildFormfgtpass(){
      this.forgotpassworddata=this.formBuilder.group({
        UserID:['',Validators.required],
        Email:['',[Validators.required, Validators.pattern(this.emailPattern)]],
        Password:['',Validators.required],
        CnfPassword:['',Validators.required]
       
    },
    {
      validator: MustMatch('Password', 'CnfPassword'),
    }
    ) }
      get fp() {
        return this.forgotpassworddata.controls;
      }
  
      forgotpass(){
        debugger
        this.submitted = true;
        if(this.forgotpassworddata.invalid){
          return;
        }
       
         else {
          const payload = {
            UserName: this.fp.UserID.value,
            Password: this.fp.Password.value,
            Email:this.fp.Email.value
          };
          this.authserice.forgotPassword(payload).subscribe(
            (data: any) => {
              debugger
             // this.users=data;
              this.closeModal.nativeElement.click();
             alert("password change successfully");
            
            },
            error => {
              alert(error.error)
            }
          );
        }
      }
      getTrainingName(n:number){
        // button click handler
     }
      // end forgot password section
}
