import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
    public authService: AuthService,
  ) { }

  skillsData: Subscription;
  positionsData: Subscription;

  get canShowContent(): boolean {
    return this.authService.isAdmin !== undefined;
  }
  ngOnInit() {
    this.skillsData = this.ems.getSkillsList();
    this.positionsData = this.ems.getPositionsList();
  }

  ngOnDestroy() {
    this.skillsData.unsubscribe();
    this.positionsData.unsubscribe();
  }

}
