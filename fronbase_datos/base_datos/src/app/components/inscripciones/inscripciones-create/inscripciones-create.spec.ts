import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesCreate } from './inscripciones-create';

describe('InscripcionesCreate', () => {
  let component: InscripcionesCreate;
  let fixture: ComponentFixture<InscripcionesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
