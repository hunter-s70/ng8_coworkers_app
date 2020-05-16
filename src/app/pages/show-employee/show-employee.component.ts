import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../../classes/employee';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit, OnDestroy {

  constructor(
    private ems: EmployeeService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  employee: Employee;
  employeeId: string;
  employeeData: Subscription;
  employeeExists = true;

  get fullName(): string {
    return this.employee ? `${this.employee.firstName} ${this.employee.lastName}` : '';
  }

  private _getEmployeeData(employeeId: string): void {
    this.employeeData = this.ems.getEmployeeById(employeeId).subscribe((data) => {
      this.employeeExists = data.exists;
      this.employee = data.employee;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.employeeId = params.uid;
      this._getEmployeeData(params.uid);
    });
  }

  ngOnDestroy() {
    this.employeeData.unsubscribe();
  }

}
