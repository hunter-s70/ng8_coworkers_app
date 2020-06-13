import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsManagerComponent } from './skills-manager.component';

describe('SkillsManagerComponent', () => {
  let component: SkillsManagerComponent;
  let fixture: ComponentFixture<SkillsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
