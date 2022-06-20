import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchdetailsdialogComponent } from './fetchdetailsdialog.component';

describe('FetchdetailsdialogComponent', () => {
  let component: FetchdetailsdialogComponent;
  let fixture: ComponentFixture<FetchdetailsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchdetailsdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchdetailsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
