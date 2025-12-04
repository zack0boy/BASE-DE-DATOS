import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesSecretariaEdit } from './asignaciones-secretaria-edit';

describe('AsignacionesSecretariaEdit', () => {
  let component: AsignacionesSecretariaEdit;
  let fixture: ComponentFixture<AsignacionesSecretariaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionesSecretariaEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesSecretariaEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
