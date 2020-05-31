import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectItem } from '../../interfaces/select-item';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-filters',
  templateUrl: './employees-filters.component.html',
  styleUrls: ['./employees-filters.component.css']
})
export class EmployeesFiltersComponent implements OnInit {

  constructor(
    private ems: EmployeeService,
  ) { }

  @Output() filtersChanged = new EventEmitter<object>();
  @Output() filtersReset = new EventEmitter<object>();

  skill = '';
  positionId = '';
  searchText = '';
  searchBy = '';
  searchByList: SelectItem[] = [
    {id: 'email', value: 'Email'},
    {id: 'lastName', value: 'Surname'},
  ];

  get searchByPlaceholder(): string {
    const searchByItem = this.searchByList.find((item) => item.id === this.searchBy);
    const searchByText = searchByItem ? searchByItem.value.toLowerCase() : '...';
    return `Search ${searchByText}`;
  }

  get filters(): object {
    return {
      searchBy: this.searchBy,
      searchText: this.searchText,
      positionId: this.positionId,
      skill: this.skill,
    };
  }

  get positions(): SelectItem[] {
    return this.ems.positions || [];
  }

  get skillsList(): string[] {
    return this.ems.skills || [];
  }

  applyFilters(): void {
    this.filtersChanged.emit(this.filters);
  }

  resetFilters(): void {
    this.clearFilters();
    this.filtersReset.emit(this.filters);
  }

  clearFilters(): void {
    this.searchBy = '';
    this.searchText = '';
    this.positionId = '';
    this.skill = '';
  }

  ngOnInit() {
  }

}
