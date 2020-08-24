import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit, OnDestroy {

  constructor(
    private ems: EmployeeService,
    private prs: ProjectService,
    public router: Router,
  ) { }

  project: Project = new Project();
  employeesData: Subscription;

  projectSave(data: object): void {
    this.prs.addProject({data}).then(() => {
      this.router.navigate(['app/projects']);
    });
  }

  get employeesList() {
    return this.ems.getEmployeesSelectorList() || [];
  }

  ngOnInit() {
    this.employeesData = this.ems.getEmployeesListForSelect();
  }

  ngOnDestroy() {
    this.employeesData.unsubscribe();
  }

}
