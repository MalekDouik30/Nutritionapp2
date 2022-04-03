import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierParameterComponent } from './modifier-parameter.component';

describe('ModifierParameterComponent', () => {
  let component: ModifierParameterComponent;
  let fixture: ComponentFixture<ModifierParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
