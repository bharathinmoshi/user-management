import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from '../app/welcome/welcome.component';
import {CreateRolesComponent} from '../app/create-roles/create-roles.component';
import {CreateUsersComponent} from '../app/create-users/create-users.component';
import {LoginPageComponent} from '../app/login-page/login-page.component';
import {UserDashboardComponent} from '../app/user-dashboard/user-dashboard.component'


const routes: Routes = [
  { path: "",redirectTo:"home",pathMatch:"full"},
  { path: 'home', component:WelcomeComponent },
  { path: 'create-role',component:CreateRolesComponent},
  { path: 'create-user',component:CreateUsersComponent},
  { path: 'login',component:LoginPageComponent},
  { path: 'user-dashboard',component:UserDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
