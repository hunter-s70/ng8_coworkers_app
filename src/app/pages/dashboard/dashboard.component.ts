import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { EmployeesFilters } from '../../services/employees-filters';

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
     this.employeeData = this.ems.getEmployeesList({limit: 20}).subscribe((data) => this.employeesList = data);
  }

  applyFilters(params: EmployeesFilters): void {
    this.employeeData = this.ems.getEmployeesList(params).subscribe((data) => this.employeesList = data);
  }

  resetFilters(): void {
    this._getAllEmployees();
  }

  ngOnInit() {
    this._getAllEmployees();
  }

  ngOnDestroy() {
    this.employeeData.unsubscribe();
  }

}
