import { Component, OnInit } from '@angular/core';
import { Employee } from '../../classes/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  employee: Employee;
  employeeId: string;
  employeeExists = true;

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

  employeeUpdate(data) {
    const employeeRef: AngularFirestoreDocument<any> = this.afs.collection('employees').doc(this.employeeId);
    employeeRef.set(data, { merge: true }).then(() => {
      this.router.navigate(['home']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = params.uid;
      this._getEmployeeData(params.uid);
    });
  }

}
