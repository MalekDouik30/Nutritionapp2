import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMaladeComponent } from './modifier-malade.component';

describe('ModifierMaladeComponent', () => {
  let component: ModifierMaladeComponent;
  let fixture: ComponentFixture<ModifierMaladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierMaladeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMaladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
