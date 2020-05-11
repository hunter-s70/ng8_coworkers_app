import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../classes/employee';

@Component({
  selector: 'app-employee-tile',
  templateUrl: './employee-tile.component.html',
  styleUrls: ['./employee-tile.component.css']
})
export class EmployeeTileComponent implements OnInit {

  constructor() { }

  @Input() employee: Employee;

  canEdit = true;

  ngOnInit() {
  }

}
