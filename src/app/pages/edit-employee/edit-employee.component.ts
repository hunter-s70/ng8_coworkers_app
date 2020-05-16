import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../../classes/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {

  constructor(
    private ems: EmployeeService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  employee: Employee;
  employeeId: string;
  employeeData: Subscription;
  employeeExists = true;

  private _getEmployeeData(employeeId: string): void {
    this.employeeData = this.ems.getEmployeeById(employeeId).subscribe((data) => {
      this.employeeExists = data.exists;
      this.employee = data.employee;
    });
  }

  employeeUpdate(data: object): void {
    const employeeId: string = this.employeeId;
    this.ems.updateEmployee({employeeId, data}).then(() => {
      this.router.navigate(['home']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = params.uid;
      this._getEmployeeData(params.uid);
    });
  }

  ngOnDestroy() {
    this.employeeData.unsubscribe();
  }

}
