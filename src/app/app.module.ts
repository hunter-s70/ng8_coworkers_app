import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// separate modules
import { AppRoutingModule } from './routing/app-routing.module';
import { AppFirebaseModule } from './modules/firebase/app-firebase.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/material/app-material.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
import { AddEmployeeFormComponent } from './components/add-employee-form/add-employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    NotFoundComponent,
    SignInComponent,
    AddEmployeeComponent,
    AddEmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AppFirebaseModule,
    AppMaterialModule,
    MatMomentDateModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
