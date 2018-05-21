import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes = [
  { path:'login', component: LoginComponent },
  { path:'signup', component: SignupComponent },
  { path:'home', component: HomeComponent },
  { path:'profile', component: ProfileComponent },
  { path:'', component: LoginComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})


export class AppRoutingModule { }
