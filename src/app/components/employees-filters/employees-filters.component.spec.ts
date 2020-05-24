import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesFiltersComponent } from './employees-filters.component';

describe('EmployeesFiltersComponent', () => {
  let component: EmployeesFiltersComponent;
  let fixture: ComponentFixture<EmployeesFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
