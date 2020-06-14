import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../interfaces/select-item';
import { SkillsDataService } from '../../services/skills-data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skills-manager',
  templateUrl: './skills-manager.component.html',
  styleUrls: ['./skills-manager.component.css']
})
export class SkillsManagerComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private skds: SkillsDataService,
  ) { }

  skillsFrom: FormGroup;

  get positions(): SelectItem[] {
    return this.skds.positions || [];
  }

  get skills(): string[] {
    return this.skds.getSkillsValuesList() || [];
  }

  addEmptySkill() {
    console.log(this.skillsFrom.value);
  }

  genSkillsForm() {
    const formSettings = {};
    this.skills.forEach((item) => {
      formSettings[item] = [item, [Validators.required, Validators.maxLength(50)]];
    });
    return this.fb.group(formSettings);
  }

  ngOnInit() {
    this.skillsFrom = this.genSkillsForm();
  }

}
