import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerdialogComponent } from './checkerdialog.component';

describe('CheckerdialogComponent', () => {
  let component: CheckerdialogComponent;
  let fixture: ComponentFixture<CheckerdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckerdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
