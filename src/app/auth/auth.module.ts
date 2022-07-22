import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NumberDirective } from '../shared/helpers/numbers-only-directive';
import { SocialAuthService } from 'angularx-social-login';


@NgModule({
  declarations: [LoginComponent, SignupComponent,NumberDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers:[AuthService,SocialAuthService]
})
export class AuthModule { }
