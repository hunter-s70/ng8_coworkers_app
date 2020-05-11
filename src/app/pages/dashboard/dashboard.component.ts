import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
  ) { }

  employeesList = [];

  private _getAllEmployees() {
    const employeesRef: AngularFirestoreCollection<any> = this.afs.collection('employees');
    employeesRef.get().subscribe(querySnapshot => {
      this.employeesList = [];
      querySnapshot.forEach((employee) => {
        const employeeData = employee.data();
        this.employeesList.push({
          ...employeeData,
          id: employee.id,
          fullName: `${employeeData.firstName} ${employeeData.lastName}`
        });
      });
    });
  }

  ngOnInit() {
    this._getAllEmployees();
  }

}
