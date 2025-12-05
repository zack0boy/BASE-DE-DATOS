import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionProgramaPlanificacion } from './seccion-programa-planificacion';

describe('SeccionProgramaPlanificacion', () => {
  let component: SeccionProgramaPlanificacion;
  let fixture: ComponentFixture<SeccionProgramaPlanificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionProgramaPlanificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionProgramaPlanificacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
