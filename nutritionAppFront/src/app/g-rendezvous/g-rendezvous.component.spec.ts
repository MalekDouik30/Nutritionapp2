import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRendezvousComponent } from './g-rendezvous.component';

describe('GRendezvousComponent', () => {
  let component: GRendezvousComponent;
  let fixture: ComponentFixture<GRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
