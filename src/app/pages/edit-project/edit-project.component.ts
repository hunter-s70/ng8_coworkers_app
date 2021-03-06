import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit, OnDestroy {

  constructor(
    private ems: EmployeeService,
    private prs: ProjectService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  project: Project;
  projectId: string;
  projectData: Subscription;
  projectExists = true;
  employeesData: Subscription;

  get employeesList() {
    return this.ems.getEmployeesSelectorList() || [];
  }

  private _getProjectData(projectId: string): void {
    this.projectData = this.prs.getProjectById(projectId).subscribe((data) => {
      this.projectExists = data.exists;
      this.project = data.project;
    });
  }

  projectUpdate(data: object): void {
    const projectId: string = this.projectId;
    this.prs.updateProject({projectId, data}).then(() => {
      this.router.navigate(['app/projects']);
    });
  }

  ngOnInit() {
    this.employeesData = this.ems.getEmployeesListForSelect();
    this.route.params.subscribe(params => {
      this.projectId = params.id;
      this._getProjectData(params.id);
    });
  }

  ngOnDestroy() {
    this.projectData.unsubscribe();
    this.employeesData.unsubscribe();
  }

}
