import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Constants } from '../../classes/constants';
import { Subscription } from 'rxjs';
import { EmployeesFiltersInterface } from '../../interfaces/employees-filters-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

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

  employeesList: object[];
  employeesPerPage: number;
  isFullList: boolean;
  employeeData: Subscription;
  lastVisibleDoc: AngularFirestoreDocument;
  initFiltersParams: EmployeesFiltersInterface;

  get showLoadMoreBtn(): boolean {
    return !!(this.lastVisibleDoc && !this.hasRouteQuery && this.employeesList.length >= Constants.EMPLOYEES_PER_PAGE);
  }

  get hasRouteQuery(): boolean {
    return !!Object.keys(this.initFiltersParams).length;
  }

  applyFilters(filters: EmployeesFiltersInterface): void {
    const queryParams = this._getFiltersQueryParams(filters);
    this.router.navigate(['/app/home'], {queryParams});
  }

  private _getFiltersQueryParams(filters: EmployeesFiltersInterface) {
    const queryParams = {};
    for (const key of Object.keys(filters)) {
      if (filters[key]) {
        queryParams[key] = filters[key];
      }
    }
    return queryParams;
  }

  resetFilters(): void {
    this.router.navigate(['/app/home'], {});
  }

  loadMoreEmployees(): void {
    this._checkSubscription();
    this.employeeData = this.ems
      .getEmployeesList(
        {lastVisibleDoc: this.lastVisibleDoc, limit: this.employeesPerPage},
        this.isFullList
      )
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
      .getEmployeesList(
        {limit: this.employeesPerPage},
        this.isFullList
      )
      .subscribe(({employeesList, lastVisibleDoc}) => {
        this.employeesList = employeesList;
        this.lastVisibleDoc = lastVisibleDoc;
      });
  }

  private _getFilteredEmployees(filters: EmployeesFiltersInterface): void {
    this._checkSubscription();
    this.employeeData = this.ems
      .getEmployeesList(
        filters,
        this.isFullList
      )
      .subscribe(({employeesList}) => {
        this.employeesList = employeesList;
        this.lastVisibleDoc = null;
      });
  }

  ngOnInit() {
    this.employeesPerPage = Constants.EMPLOYEES_PER_PAGE;
    this.isFullList = this.authService.isAdmin;

    this.route.queryParams.subscribe((params) => {
      this.initFiltersParams = params;
      if (this.hasRouteQuery) {
        this._getFilteredEmployees(this.initFiltersParams);
      } else {
        this._getAllEmployees();
      }
    });
  }

  ngOnDestroy() {
    this._checkSubscription();
  }

}
