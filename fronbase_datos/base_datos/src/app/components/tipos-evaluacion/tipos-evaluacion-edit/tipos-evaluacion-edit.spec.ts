import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposEvaluacionEdit } from './tipos-evaluacion-edit';

describe('TiposEvaluacionEdit', () => {
  let component: TiposEvaluacionEdit;
  let fixture: ComponentFixture<TiposEvaluacionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposEvaluacionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposEvaluacionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
