import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const modulesList = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatSelectModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
];

@NgModule({
  imports: modulesList,
  exports: modulesList,
})
export class AppMaterialModule { }
