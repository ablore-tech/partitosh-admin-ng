import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsLaravelDataTableComponent } from './xs-laravel-data-table.component';

describe('XsLaravelDataTableComponent', () => {
  let component: XsLaravelDataTableComponent;
  let fixture: ComponentFixture<XsLaravelDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XsLaravelDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XsLaravelDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
