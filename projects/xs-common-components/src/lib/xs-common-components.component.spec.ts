import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsCommonComponentsComponent } from './xs-common-components.component';

describe('XsCommonComponentsComponent', () => {
  let component: XsCommonComponentsComponent;
  let fixture: ComponentFixture<XsCommonComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XsCommonComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XsCommonComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
