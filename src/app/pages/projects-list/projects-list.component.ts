import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Constants } from '../../classes/constants';
import { Subscription } from 'rxjs';
import { EmployeesFiltersInterface } from '../../interfaces/employees-filters-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {

  constructor(
    private prs: ProjectService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  projectsList: object[];
  itemsPerPage: number;
  isFullList: boolean;
  projectsData: Subscription;
  lastVisibleDoc: AngularFirestoreDocument;
  initFiltersParams: EmployeesFiltersInterface;

  get showLoadMoreBtn(): boolean {
    return !!(this.lastVisibleDoc && !this.hasRouteQuery && this.projectsList.length >= Constants.POJECTS_PER_PAGE);
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

  loadMoreItems(): void {
    this._checkSubscription();
    this.projectsData = this.prs
      .getItemsList(
        {lastVisibleDoc: this.lastVisibleDoc, limit: this.itemsPerPage},
        this.isFullList
      )
      .subscribe(({itemsList, lastVisibleDoc}) => {
        console.log(itemsList, lastVisibleDoc);
        this.projectsList = [...this.projectsList, ...itemsList];
        this.lastVisibleDoc = lastVisibleDoc;
      });
  }

  private _checkSubscription(): void {
    if (this.projectsData) {
      this.projectsData.unsubscribe();
    }
  }

  private _getAllEmployees(): void {
    this._checkSubscription();
    this.projectsData = this.prs
      .getItemsList(
        {limit: this.itemsPerPage},
        this.isFullList
      )
      .subscribe(({itemsList, lastVisibleDoc}) => {
        this.projectsList = itemsList;
        this.lastVisibleDoc = lastVisibleDoc;
      });
  }

  // private _getFilteredEmployees(filters: EmployeesFiltersInterface): void {
  //   this._checkSubscription();
  //   this.projectsData = this.prs
  //     .getItemsList(
  //       filters,
  //       this.isFullList
  //     )
  //     .subscribe(({itemsList}) => {
  //       this.projectsList = itemsList;
  //       this.lastVisibleDoc = null;
  //     });
  // }

  ngOnInit() {
    this.itemsPerPage = Constants.POJECTS_PER_PAGE;
    this.isFullList = this.authService.isAdmin;

    this._getAllEmployees();
    // this.route.queryParams.subscribe((params) => {
    //   this.initFiltersParams = params;
    //   if (this.hasRouteQuery) {
    //     this._getFilteredEmployees(this.initFiltersParams);
    //   } else {
    //     this._getAllEmployees();
    //   }
    // });
  }

  ngOnDestroy() {
    this._checkSubscription();
  }


}
