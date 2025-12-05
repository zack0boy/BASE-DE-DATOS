import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionDocentes } from './seccion-docentes';

describe('SeccionDocentes', () => {
  let component: SeccionDocentes;
  let fixture: ComponentFixture<SeccionDocentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionDocentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionDocentes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
