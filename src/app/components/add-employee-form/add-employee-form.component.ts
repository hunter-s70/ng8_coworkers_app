import { Component, OnInit } from '@angular/core';
import { Employee } from '../../classes/employee';
import { Router } from '@angular/router';
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

  addNewEmployee(): void {
    const refCollcetion: AngularFirestoreCollection<any> = this.afs.collection('employee');
    const data = {
      ...this.employee,
      firstday: this.employee.firstday.toString(),
      birthday: this.employee.birthday.toString()
    };
    refCollcetion.add(data).then(() => {
      this.router.navigate(['home']);
    });
  }

  ngOnInit() {
  }

}
