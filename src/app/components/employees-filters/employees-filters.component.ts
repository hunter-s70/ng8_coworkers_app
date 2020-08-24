import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from '../../interfaces/select-item';
import { SkillsDataService } from '../../services/skills-data.service';
import { EmployeesFiltersInterface } from '../../interfaces/employees-filters-interface';

@Component({
  selector: 'app-employees-filters',
  templateUrl: './employees-filters.component.html',
  styleUrls: [
    '../../../assets/styles/entity-filters.css',
    './employees-filters.component.css'
  ]
})
export class EmployeesFiltersComponent implements OnInit {

  constructor(
    private skds: SkillsDataService,
  ) { }

  @Input() initFilters: EmployeesFiltersInterface;
  @Output() filtersChanged = new EventEmitter<object>();
  @Output() filtersReset = new EventEmitter<object>();

  filters: EmployeesFiltersInterface;
  searchByList: SelectItem[] = [
    {id: 'email', value: 'Email'},
    {id: 'lastName', value: 'Surname'},
  ];

  get searchByPlaceholderText(): string {
    const searchByItem = this.searchByList.find((item) => item.id === this.filters.searchBy);
    const searchByText = searchByItem ? searchByItem.value.toLowerCase() : '...';
    return `Search ${searchByText}`;
  }

  get positions(): SelectItem[] {
    return this.skds.positions || [];
  }

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
      searchBy,
      searchText,
      positionId,
      skillName
    } = this.initFilters;

    this.filters = {
      searchBy,
      searchText,
      positionId,
      skillName
    };
  }

  ngOnInit() {
    this._setInitialFilters();
  }

}
