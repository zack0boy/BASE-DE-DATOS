import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesEdit } from './evaluaciones-edit';

describe('EvaluacionesEdit', () => {
  let component: EvaluacionesEdit;
  let fixture: ComponentFixture<EvaluacionesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
