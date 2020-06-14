import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from '../../interfaces/select-item';
import { SkillsDataService } from '../../services/skills-data.service';
import { EmployeesFilters } from '../../classes/employees-filters';

@Component({
  selector: 'app-employees-filters',
  templateUrl: './employees-filters.component.html',
  styleUrls: ['./employees-filters.component.css']
})
export class EmployeesFiltersComponent implements OnInit {

  constructor(
    private skds: SkillsDataService,
  ) { }

  @Input() initFilters: EmployeesFilters;
  @Output() filtersChanged = new EventEmitter<object>();
  @Output() filtersReset = new EventEmitter<object>();

  filters: EmployeesFilters;
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
    this.filters = new EmployeesFilters();
  }

  private _setInitialFilters() {
    const {
      searchBy,
      searchText,
      positionId,
      skillName
    } = this.initFilters;

    this.filters = new EmployeesFilters(
      searchBy,
      searchText,
      positionId,
      skillName
    );
  }

  ngOnInit() {
    this._setInitialFilters();
  }

}
