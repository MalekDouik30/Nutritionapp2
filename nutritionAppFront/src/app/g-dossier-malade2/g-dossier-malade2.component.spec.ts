import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDossierMalade2Component } from './g-dossier-malade2.component';

describe('GDossierMalade2Component', () => {
  let component: GDossierMalade2Component;
  let fixture: ComponentFixture<GDossierMalade2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GDossierMalade2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GDossierMalade2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
