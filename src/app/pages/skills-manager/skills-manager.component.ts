import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../interfaces/select-item';
import { SkillsDataService } from '../../services/skills-data.service';

@Component({
  selector: 'app-skills-manager',
  templateUrl: './skills-manager.component.html',
  styleUrls: ['./skills-manager.component.css']
})
export class SkillsManagerComponent implements OnInit {

  constructor(
    private skds: SkillsDataService,
  ) { }

  get positions(): SelectItem[] {
    return this.skds.positions || [];
  }

  get skills(): SelectItem[] {
    return this.skds.skills || [];
  }

  exportSkills() {
    console.log('export here');
    console.log(this.skills);
  }

  ngOnInit() {
  }

}
