import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// separate modules
import { AppRoutingModule } from './routing/app-routing.module';
import { AppFirebaseModule } from './modules/firebase/app-firebase.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/material/app-material.module';
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
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

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
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AppFirebaseModule,
    AppMaterialModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
