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

  searchBy = '';
  positionId = '';
  skillsList: string[] = [];

  get filters(): object {
    return {
      searchBy: this.searchBy,
      positionId: this.positionId,
      skillsList: this.skillsList,
    };
  }

  get positions(): SelectItem[] {
    return this.ems.positions || [];
  }

  get skills(): string[] {
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
    this.positionId = '';
    this.skillsList = [];
  }

  ngOnInit() {
  }

}
