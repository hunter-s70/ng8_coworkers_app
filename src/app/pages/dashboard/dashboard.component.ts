import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { EmployeesFilters } from '../../interfaces/employees-filters';

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
  employeesPerPage: number;
  lastVisibleDoc: '';
  isFullList = this.authService.isAdmin;

  private _getAllEmployees(): void {
    this._checkSubscription();
    this.employeeData = this.ems
      .getEmployeesList({limit: this.employeesPerPage}, this.isFullList)
      .subscribe(({employeesList, lastVisibleDoc}) => {
        this.employeesList = employeesList;
        this.lastVisibleDoc = lastVisibleDoc;
      });
  }

  applyFilters(params: EmployeesFilters): void {
    this._checkSubscription();
    this.employeeData = this.ems
      .getEmployeesList(params, this.isFullList)
      .subscribe(({employeesList}) => {
        this.employeesList = employeesList;
        this.lastVisibleDoc = null;
      });
  }

  resetFilters(): void {
    this._getAllEmployees();
  }

  loadMoreEmployees(): void {
    this._checkSubscription();
    this.employeeData = this.ems
      .getEmployeesList({startAfter: this.lastVisibleDoc, limit: this.employeesPerPage}, this.isFullList)
      .subscribe(({employeesList, lastVisibleDoc}) => {
        this.employeesList = [...this.employeesList, ...employeesList];
        this.lastVisibleDoc = lastVisibleDoc;
      });
  }

  private _checkSubscription(): void {
    if (this.employeeData) {
      this.employeeData.unsubscribe();
    }
  }

  ngOnInit() {
    this.employeesPerPage = 1;
    this._getAllEmployees();
  }

  ngOnDestroy() {
    this.employeeData.unsubscribe();
  }

}
