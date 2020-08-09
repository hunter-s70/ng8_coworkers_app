import { NgModule } from '@angular/core';

// npm file-input-material component
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const modulesList = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatSelectModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatTabsModule,
  NgxMatFileInputModule,
  MatProgressBarModule,
];

@NgModule({
  imports: modulesList,
  exports: modulesList,
})
export class AppMaterialModule { }
