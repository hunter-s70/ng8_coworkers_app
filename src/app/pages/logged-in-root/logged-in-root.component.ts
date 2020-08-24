import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillsDataService } from '../../services/skills-data.service';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logged-in-root',
  templateUrl: './logged-in-root.component.html',
  styleUrls: ['./logged-in-root.component.css']
})
export class LoggedInRootComponent implements OnInit, OnDestroy {

  constructor(
    private ems: EmployeeService,
    private skds: SkillsDataService,
    public authService: AuthService,
  ) { }

  skillsData: Subscription;
  positionsData: Subscription;
  employeesData: Subscription;

  get canShowContent(): boolean {
    return this.authService.isAdmin !== undefined;
  }

  ngOnInit() {
    this.skillsData = this.skds.getSkillsList();
    this.positionsData = this.skds.getPositionsList();
    this.employeesData = this.ems.getEmployeesListForSelect();
  }

  ngOnDestroy() {
    this.skillsData.unsubscribe();
    this.positionsData.unsubscribe();
    this.employeesData.unsubscribe();
  }

}
