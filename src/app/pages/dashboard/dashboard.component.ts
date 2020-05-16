import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private ems: EmployeeService,
    public authService: AuthService,
  ) { }

  employeesList = [];
  employeeData: Subscription;

  private _getAllEmployees(): void {
     this.employeeData = this.ems.getEmployeesList().subscribe((data) => this.employeesList = data);
  }

  ngOnInit() {
    this._getAllEmployees();
  }

  ngOnDestroy() {
    this.employeeData.unsubscribe();
  }

}
