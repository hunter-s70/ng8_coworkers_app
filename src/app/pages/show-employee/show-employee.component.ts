import { Component, OnInit } from '@angular/core';
import { Employee } from '../../classes/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  employee: Employee;
  employeeId: string;
  employeeExists = true;

  get fullName(): string {
    return this.employee ? `${this.employee.firstName} ${this.employee.lastName}` : '';
  }

  private _getEmployeeData(employeeId) {
    const employeeRef: AngularFirestoreDocument<any> = this.afs.collection('employees').doc(employeeId);
    employeeRef.get().subscribe(doc => {
      this.employeeExists = doc.exists;
      if (doc.exists) {
        const {
          firstName,
          lastName,
          email,
          positionId,
          skillsList,
          birthday,
          firstday,
          userPhoto,
          isActive,
          createdAt,
          updatedAt,
          bio
        } = doc.data();
        this.employee = new Employee(
          firstName,
          lastName,
          email,
          positionId,
          skillsList,
          birthday,
          firstday,
          userPhoto,
          isActive,
          createdAt,
          updatedAt,
          bio);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = params.uid;
      this._getEmployeeData(params.uid);
    });
  }

}
