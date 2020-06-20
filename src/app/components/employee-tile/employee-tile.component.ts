import { Component, OnInit, Input } from '@angular/core';
import { SkillsDataService } from '../../services/skills-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-tile',
  templateUrl: './employee-tile.component.html',
  styleUrls: ['./employee-tile.component.css']
})
export class EmployeeTileComponent implements OnInit {

  constructor(
    public skds: SkillsDataService,
    public authService: AuthService,
  ) { }

  @Input() employee: any;

  ngOnInit() {
  }

}
