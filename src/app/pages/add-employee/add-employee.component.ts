import { Component, OnInit } from '@angular/core';
import { Employee } from '../../classes/employee';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    public router: Router,
  ) { }

  employee: Employee = new Employee();

  employeeSave(data: object): void {
    const refCollcetion: AngularFirestoreCollection<any> = this.afs.collection('employees');
    refCollcetion.add(data).then(() => {
      this.router.navigate(['home']);
    });
  }

  ngOnInit() {
  }

}
