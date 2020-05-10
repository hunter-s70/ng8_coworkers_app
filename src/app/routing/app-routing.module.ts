import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { AddEmployeeComponent } from '../pages/add-employee/add-employee.component';
import { EditEmployeeComponent } from '../pages/edit-employee/edit-employee.component';

import { AuthGuard } from '../guards/auth.guard';
import { SecureInnerPagesGuard } from '../guards/secure-inner-pages.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'employee', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  { path: 'employee/:uid', component: EditEmployeeComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
