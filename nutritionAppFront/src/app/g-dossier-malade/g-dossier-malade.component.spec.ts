import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDossierMaladeComponent } from './g-dossier-malade.component';

describe('GDossierMaladeComponent', () => {
  let component: GDossierMaladeComponent;
  let fixture: ComponentFixture<GDossierMaladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GDossierMaladeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GDossierMaladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
