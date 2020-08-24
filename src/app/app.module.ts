import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// animations
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // added for MatProgressBarModule

// separate modules
import { AppRoutingModule } from './routing/app-routing.module';
import { AppFirebaseModule } from './modules/firebase/app-firebase.module';
import { AppMaterialModule } from './modules/material/app-material.module';
import { AppInputMaskModule } from './modules/input-mask/app-input-mask.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// services
import { AuthService } from './services/auth.service';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';
import { AddEmployeeFormComponent } from './components/add-employee-form/add-employee-form.component';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { EmployeeTileComponent } from './components/employee-tile/employee-tile.component';
import { ShowEmployeeComponent } from './pages/show-employee/show-employee.component';
import { LoggedInRootComponent } from './pages/logged-in-root/logged-in-root.component';
import { EmployeesFiltersComponent } from './components/employees-filters/employees-filters.component';
import { SkillsManagerComponent } from './pages/skills-manager/skills-manager.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { AddProjectFormComponent } from './components/add-project-form/add-project-form.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectTileComponent } from './components/project-tile/project-tile.component';
import { AdminActionsComponent } from './components/admin-actions/admin-actions.component';
import { ShowProjectComponent } from './pages/show-project/show-project.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    NotFoundComponent,
    SignInComponent,
    AddEmployeeComponent,
    AddEmployeeFormComponent,
    TagsListComponent,
    AvatarComponent,
    AvatarUploadComponent,
    EditEmployeeComponent,
    EmployeeTileComponent,
    ShowEmployeeComponent,
    LoggedInRootComponent,
    EmployeesFiltersComponent,
    SkillsManagerComponent,
    AddProjectComponent,
    AddProjectFormComponent,
    ProjectsListComponent,
    ProjectTileComponent,
    AdminActionsComponent,
    ShowProjectComponent,
    EditProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AppFirebaseModule,
    AppMaterialModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    AppInputMaskModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
