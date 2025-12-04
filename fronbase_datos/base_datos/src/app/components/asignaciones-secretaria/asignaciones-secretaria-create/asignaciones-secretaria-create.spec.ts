import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesSecretariaCreate } from './asignaciones-secretaria-create';

describe('AsignacionesSecretariaCreate', () => {
  let component: AsignacionesSecretariaCreate;
  let fixture: ComponentFixture<AsignacionesSecretariaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionesSecretariaCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesSecretariaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
