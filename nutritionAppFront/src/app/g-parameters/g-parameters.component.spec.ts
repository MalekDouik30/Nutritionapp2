import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GParametersComponent } from './g-parameters.component';

describe('GParametersComponent', () => {
  let component: GParametersComponent;
  let fixture: ComponentFixture<GParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
