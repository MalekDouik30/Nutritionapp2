import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GUtilisateurComponent } from './g-utilisateur.component';

describe('GUtilisateurComponent', () => {
  let component: GUtilisateurComponent;
  let fixture: ComponentFixture<GUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
