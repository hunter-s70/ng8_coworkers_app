import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(
    private prs: ProjectService,
    public router: Router,
  ) { }

  project: Project = new Project();

  projectSave(data: object): void {
    this.prs.addProject({data}).then(() => {
      this.router.navigate(['app/home']);
    });
  }

  ngOnInit() {
  }

}
