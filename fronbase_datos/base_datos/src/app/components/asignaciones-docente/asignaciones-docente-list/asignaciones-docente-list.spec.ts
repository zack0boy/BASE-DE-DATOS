import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesDocenteList } from './asignaciones-docente-list';

describe('AsignacionesDocenteList', () => {
  let component: AsignacionesDocenteList;
  let fixture: ComponentFixture<AsignacionesDocenteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionesDocenteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesDocenteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
