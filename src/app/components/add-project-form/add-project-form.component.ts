import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../classes/project';
import { SkillsDataService } from '../../services/skills-data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: [
    '../../../assets/styles/entity-form.css',
    './add-project-form.component.css',
  ]
})
export class AddProjectFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private skds: SkillsDataService,
  ) { }

  @Input() project: Project;
  @Input() submitBtnText: string;
  @Output() saveData = new EventEmitter<object>();

  projectForm: FormGroup;
  isCompany = true;

  get saveFormText(): string {
    return this.submitBtnText || 'Add project';
  }

  get skills(): string[] {
    return this.skds.getSkillsValuesList() || [];
  }

  addNewProject(): void {
    if (!this.projectForm.invalid) {
      const formData = this.projectForm.value;
      const data = this.project.genProjectDataObject(formData);
      this.saveData.emit(data);
    }
  }

  updateAvatar(logo): void {
    this.project.logo = logo;
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      isActive: [this.project.isActive],
      name: [this.project.name, [Validators.required, Validators.maxLength(20)]],
      reference: [this.project.reference, [Validators.maxLength(300)]],
      description: [this.project.description, [Validators.required, Validators.maxLength(800)]],
      feedback: [this.project.feedback, [Validators.maxLength(800)]],
      startTime: [this.project.getMomentDate(this.project.startTime), [Validators.required]],
      finishTime: [this.project.finishTime],
    });
  }

}
