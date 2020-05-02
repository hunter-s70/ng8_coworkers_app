import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Employee } from '../../classes/employee';
import { Router } from '@angular/router';
import { SelectItem } from '../../services/select-item';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  constructor(
    public afs: AngularFirestore,
    public router: Router,
  ) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.skills.slice()));
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  employee: Employee = new Employee();
  positions: SelectItem[] = [
    {id: 'frontent', value: 'Front-end'},
    {id: 'backend', value: 'Back-end'},
    {id: 'fullstack', value: 'Full-stack'}
  ];

  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  selectedSkills: string[] = [];
  skills: string[] = ['Javascript', 'Ruby', 'Python', 'rails-admin'];

  @ViewChild('skillInput', {static: false}) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    // Add skill only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our skill
      if ((value || '').trim()) {
        this.selectedSkills.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.skillCtrl.setValue(null);
    }
  }

  remove(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);

    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSkills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  addNewEmployee(): void {
    const refCollcetion: AngularFirestoreCollection<any> = this.afs.collection('employees');
    const data = {
      ...this.employee,
      firstday: this.employee.firstday.toString(),
      birthday: this.employee.birthday.toString(),
    };
    refCollcetion.add(data).then(() => {
      this.router.navigate(['home']);
    });
  }

  ngOnInit() {
  }

}
