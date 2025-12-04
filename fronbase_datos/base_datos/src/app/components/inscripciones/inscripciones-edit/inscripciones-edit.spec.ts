import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesEdit } from './inscripciones-edit';

describe('InscripcionesEdit', () => {
  let component: InscripcionesEdit;
  let fixture: ComponentFixture<InscripcionesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
