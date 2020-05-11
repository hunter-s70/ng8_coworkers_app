import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../classes/employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  constructor() { }

  @Input() employeesList: Employee[];

  ngOnInit() {
  }

}
