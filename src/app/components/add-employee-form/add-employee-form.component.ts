import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../classes/employee';
import { SelectItem } from '../../services/select-item';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) { }

  @Input() employeeData: Employee;
  @Output() saveData = new EventEmitter<object>();

  get employee(): Employee {
    return this.employeeData ? this.employeeData : new Employee();
  }

  positions: SelectItem[] = [
    {id: 'frontent', value: 'Front-end'},
    {id: 'backend', value: 'Back-end'},
    {id: 'fullstack', value: 'Full-stack'}
  ];
  skills: string[] = ['Javascript', 'Ruby', 'Python', 'rails-admin', 'Vue.js'];

  employeeFrom = this.fb.group({
    firstName: [this.employee.firstName, [Validators.required, Validators.maxLength(20)]],
    lastName: [this.employee.lastName, [Validators.required, Validators.maxLength(20)]],
    email: [this.employee.email, [Validators.required, Validators.email, Validators.maxLength(50)]],
    bio: [this.employee.bio, [Validators.maxLength(800)]],
    positionId: [this.employee.positionId, [Validators.required]],
    birthday: [this.employee.birthday, [Validators.required]],
    firstday: [this.employee.firstday, [Validators.required]],
  });

  addNewEmployee(): void {
    if (!this.employeeFrom.invalid) {
      const formData = this.employeeFrom.value;
      const data = this.employee.genEmployeeDataObject(formData);
      this.saveData.emit(data);
    }
  }

  updateAvatar(avatar): void {
    this.employee.userPhoto = avatar;
  }

  ngOnInit() {
  }

}
