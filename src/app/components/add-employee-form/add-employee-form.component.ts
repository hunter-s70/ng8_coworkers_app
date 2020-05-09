import { Component, OnInit } from '@angular/core';
import { Employee } from '../../classes/employee';
import { Router } from '@angular/router';
import { SelectItem } from '../../services/select-item';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public afs: AngularFirestore,
    public router: Router,
  ) { }

  employee: Employee = new Employee();
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
      const refCollcetion: AngularFirestoreCollection<any> = this.afs.collection('employees');
      const formData = this.employeeFrom.value;
      const data = {
        ...formData,
        firstday: formData.firstday.toString(),
        birthday: formData.birthday.toString(),
        skillsList: this.employee.skillsList,
        userPhoto: this.employee.userPhoto,
        isActive: true,
        createdAt: '',
        updatedAt: '',
      };
      refCollcetion.add(data).then(() => {
        this.router.navigate(['home']);
      });
    }
  }

  updateAvatar(avatar): void {
    this.employee.userPhoto = avatar;
  }

  ngOnInit() {
  }

}
