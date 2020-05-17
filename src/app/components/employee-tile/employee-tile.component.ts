import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../classes/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-tile',
  templateUrl: './employee-tile.component.html',
  styleUrls: ['./employee-tile.component.css']
})
export class EmployeeTileComponent implements OnInit {

  constructor(
    private ems: EmployeeService,
  ) { }

  @Input() employee: Employee;

  canEdit = true;

  ngOnInit() {
  }

}
