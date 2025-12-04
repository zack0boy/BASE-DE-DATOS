import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesInicio } from './estudiantes-inicio';

describe('EstudiantesInicio', () => {
  let component: EstudiantesInicio;
  let fixture: ComponentFixture<EstudiantesInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesInicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesInicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
