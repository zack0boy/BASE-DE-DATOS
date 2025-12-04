import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesSecretariaList } from './asignaciones-secretaria-list';

describe('AsignacionesSecretariaList', () => {
  let component: AsignacionesSecretariaList;
  let fixture: ComponentFixture<AsignacionesSecretariaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionesSecretariaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesSecretariaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
