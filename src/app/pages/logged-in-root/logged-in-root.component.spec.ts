import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInRootComponent } from './logged-in-root.component';

describe('LoggedInRootComponent', () => {
  let component: LoggedInRootComponent;
  let fixture: ComponentFixture<LoggedInRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedInRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
