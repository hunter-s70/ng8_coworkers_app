import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTileComponent } from './employee-tile.component';

describe('EmployeeTileComponent', () => {
  let component: EmployeeTileComponent;
  let fixture: ComponentFixture<EmployeeTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
