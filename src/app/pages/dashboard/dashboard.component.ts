import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { EmployeesFilters } from '../../interfaces/employees-filters';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private ems: EmployeeService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  employeeData: Subscription;
  employeesPerPage: number;
  employeesList: any[];
  lastVisibleDoc: any;
  initFiltersParams: object;
  isFullList: boolean;

  get showLoadMoreBtn(): boolean {
    return !!(this.lastVisibleDoc && !Object.keys(this.initFiltersParams).length);
  }

  applyFilters(params: EmployeesFilters): void {
    const queryParams = {};
    for (const key of Object.keys(params)) {
      if (params[key]) {
        queryParams[key] = params[key];
      }
    }
    this.router.navigate(['/app/home'], {queryParams});
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

  private _getAllEmployees(): void {
    this._checkSubscription();
    this.employeeData = this.ems
      .getEmployeesList({limit: this.employeesPerPage}, this.isFullList)
      .subscribe(({employeesList, lastVisibleDoc}) => {
        this.employeesList = employeesList;
        this.lastVisibleDoc = lastVisibleDoc;
      });
  }

  private _getFilteredEmployees(params: EmployeesFilters): void {
    this._checkSubscription();
    this.employeeData = this.ems
      .getEmployeesList(params, this.isFullList)
      .subscribe(({employeesList}) => {
        this.employeesList = employeesList;
        this.lastVisibleDoc = null;
      });
  }

  ngOnInit() {
    this.employeesPerPage = 15;
    this.employeesList = [];
    this.lastVisibleDoc = '';
    this.initFiltersParams = {};
    this.isFullList = this.authService.isAdmin;

    this._getAllEmployees();

    this.route.queryParams.subscribe(params => {
      this.initFiltersParams = params;
      this._getFilteredEmployees(params);
    });
  }

  ngOnDestroy() {
    this._checkSubscription();
  }

}
