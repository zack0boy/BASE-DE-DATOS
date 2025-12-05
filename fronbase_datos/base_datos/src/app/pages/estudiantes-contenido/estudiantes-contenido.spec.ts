import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesContenido } from './estudiantes-contenido';

describe('EstudiantesContenido', () => {
  let component: EstudiantesContenido;
  let fixture: ComponentFixture<EstudiantesContenido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesContenido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesContenido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
