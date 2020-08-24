import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: [
    '../../../assets/styles/entity-show.css',
    './show-project.component.css'
  ]
})
export class ShowProjectComponent implements OnInit, OnDestroy {

  constructor(
    private prs: ProjectService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  project: Project;
  projectId: string;
  projectData: Subscription;
  projectExists = true;
  isCompany = true;

  get dataList(): any[] {
    return [
      {
        title: 'Description',
        data: this.project.description,
      },
      {
        title: 'Project reference',
        data: this.project.reference
          ? `<a href="${this.project.reference}" target="_blank">${this.project.reference}</a>`
          : '',
      },
      {
        title: 'Participants',
        data: this.project.participants && this.project.participants.length
          ? this.project.participants
            .map(item => `<a class="employee-ref" href="/app/employee/${item.id}" target="_blank">${item.value}</a>`)
            .join('')
          : '',
      },
      {
        title: 'Stack',
        class: 'show-project__data--skills',
        data: this.project.stack.map(item => `<span class="skill-clip">${item}</span>`).join(''),
      },
      {
        title: 'Start time',
        data: this.project.getMomentDate(this.project.startTime).format('DD/MM/YYYY'),
      },
      {
        title: 'Finish time',
        data: this.project.finishTime
          ? this.project.getMomentDate(this.project.finishTime).format('DD/MM/YYYY')
          : 'in progress',
      },
      {
        title: 'Feedback',
        data: this.project.feedback,
      },
    ];
  }

  private _getProjectData(projectId: string): void {
    this.projectData = this.prs.getProjectById(projectId).subscribe((data) => {
      this.projectExists = data.exists;
      this.project = data.project;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.projectId = params.id;
      this._getProjectData(params.id);
    });
  }

  ngOnDestroy() {
    this.projectData.unsubscribe();
  }

}
