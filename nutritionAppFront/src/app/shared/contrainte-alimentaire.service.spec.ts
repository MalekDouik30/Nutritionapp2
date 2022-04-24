import { TestBed } from '@angular/core/testing';

import { ContrainteAlimentaireService } from './contrainte-alimentaire.service';

describe('ContrainteAlimentaireService', () => {
  let service: ContrainteAlimentaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContrainteAlimentaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
