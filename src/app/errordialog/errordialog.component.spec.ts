import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrordialogComponent } from './errordialog.component';

describe('ErrordialogComponent', () => {
  let component: ErrordialogComponent;
  let fixture: ComponentFixture<ErrordialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrordialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrordialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
