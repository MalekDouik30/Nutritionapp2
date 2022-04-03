import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMoncompteComponent } from './modifier-moncompte.component';

describe('ModifierMoncompteComponent', () => {
  let component: ModifierMoncompteComponent;
  let fixture: ComponentFixture<ModifierMoncompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierMoncompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMoncompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
