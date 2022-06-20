import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HptInputDetailsComponent } from './hpt-input-details.component';

describe('HptInputDetailsComponent', () => {
  let component: HptInputDetailsComponent;
  let fixture: ComponentFixture<HptInputDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HptInputDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HptInputDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
