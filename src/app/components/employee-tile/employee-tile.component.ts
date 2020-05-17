import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../classes/employee';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-tile',
  templateUrl: './employee-tile.component.html',
  styleUrls: ['./employee-tile.component.css']
})
export class EmployeeTileComponent implements OnInit {

  constructor(
    private ems: EmployeeService,
    public authService: AuthService,
  ) { }

  @Input() employee: Employee;

  ngOnInit() {
  }

}
