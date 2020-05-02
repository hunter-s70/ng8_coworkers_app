import { Component, OnInit } from '@angular/core';
import { Employee } from '../../classes/employee';
import { Router } from '@angular/router';
import { SelectItem } from '../../services/select-item';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  constructor(
    public afs: AngularFirestore,
    public router: Router,
  ) { }

  employee: Employee = new Employee();
  positions: SelectItem[] = [
    {id: 'frontent', value: 'Front-end'},
    {id: 'backend', value: 'Back-end'},
    {id: 'fullstack', value: 'Full-stack'}
  ];

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
