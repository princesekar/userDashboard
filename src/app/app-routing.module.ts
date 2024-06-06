import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
// import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard]},
      { path: 'profile-edit', component: ProfileEditComponent , canActivate: [authGuard]},
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
