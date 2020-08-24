import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SkillsDataService } from '../../services/skills-data.service';
import { ProjectsFiltersInterface } from '../../interfaces/projects-filters-interface';

@Component({
  selector: 'app-projects-filters',
  templateUrl: './projects-filters.component.html',
  styleUrls: [
    '../../../assets/styles/entity-filters.css',
    './projects-filters.component.css'
  ]
})
export class ProjectsFiltersComponent implements OnInit {

  constructor(
    private skds: SkillsDataService,
  ) { }

  @Input() initFilters: ProjectsFiltersInterface;
  @Output() filtersChanged = new EventEmitter<object>();
  @Output() filtersReset = new EventEmitter<object>();

  filters: ProjectsFiltersInterface;

  get skillsList(): string[] {
    return this.skds.getSkillsValuesList() || [];
  }

  applyFilters(): void {
    this.filtersChanged.emit(this.filters);
  }

  resetFilters(): void {
    this.clearFilters();
    this.filtersReset.emit(this.filters);
  }

  clearFilters(): void {
    this.filters = {};
  }

  private _setInitialFilters() {
    const {
      name,
      skillName
    } = this.initFilters;

    this.filters = {
      name,
      skillName
     };
  }

  ngOnInit() {
    this._setInitialFilters();
  }

}
