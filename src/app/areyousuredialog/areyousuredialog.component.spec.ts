import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreyousuredialogComponent } from './areyousuredialog.component';

describe('AreyousuredialogComponent', () => {
  let component: AreyousuredialogComponent;
  let fixture: ComponentFixture<AreyousuredialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreyousuredialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreyousuredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
