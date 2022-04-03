import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GMaladeComponent } from './g-malade.component';

describe('GMaladeComponent', () => {
  let component: GMaladeComponent;
  let fixture: ComponentFixture<GMaladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GMaladeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GMaladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
