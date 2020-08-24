import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { LoggedInRootComponent } from '../pages/logged-in-root/logged-in-root.component';
import { AddEmployeeComponent } from '../pages/add-employee/add-employee.component';
import { EditEmployeeComponent } from '../pages/edit-employee/edit-employee.component';
import { ShowEmployeeComponent } from '../pages/show-employee/show-employee.component';
import { SkillsManagerComponent } from '../pages/skills-manager/skills-manager.component';
import { AddProjectComponent } from '../pages/add-project/add-project.component';
import { ProjectsListComponent } from '../pages/projects-list/projects-list.component';
import { ShowProjectComponent } from '../pages/show-project/show-project.component';
import { EditProjectComponent } from '../pages/edit-project/edit-project.component';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { SecureInnerPagesGuard } from '../guards/secure-inner-pages.guard';


const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'app',
    component: LoggedInRootComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DashboardComponent},
      { path: 'employee-add', component: AddEmployeeComponent, canActivate: [AdminGuard]},
      { path: 'employee-edit/:uid', component: EditEmployeeComponent, canActivate: [AdminGuard]},
      { path: 'employee/:uid', component: ShowEmployeeComponent},
      { path: 'projects', component: ProjectsListComponent},
      { path: 'project-add', component: AddProjectComponent, canActivate: [AdminGuard]},
      { path: 'project-edit/:id', component: EditProjectComponent, canActivate: [AdminGuard]},
      { path: 'project/:id', component: ShowProjectComponent},
      { path: 'skills-manager', component: SkillsManagerComponent, canActivate: [AdminGuard]},
    ]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
