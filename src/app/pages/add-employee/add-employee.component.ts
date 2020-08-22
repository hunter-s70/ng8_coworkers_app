import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../classes/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private ems: EmployeeService,
    public router: Router,
  ) { }

  employee: Employee = new Employee();

  employeeSave(data: object): void {
    this.ems.addEmployee({data}).then(() => {
      this.router.navigate(['app/home']);
    });
  }

  ngOnInit() {
  }

}
