import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../classes/employee';
import { SkillsDataService } from '../../services/skills-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-tile',
  templateUrl: './employee-tile.component.html',
  styleUrls: ['./employee-tile.component.css']
})
export class EmployeeTileComponent implements OnInit {

  constructor(
    private skds: SkillsDataService,
    public authService: AuthService,
  ) { }

  @Input() employee: Employee;

  ngOnInit() {
  }

}
