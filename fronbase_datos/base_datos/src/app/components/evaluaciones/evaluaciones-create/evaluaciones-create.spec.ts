import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesCreate } from './evaluaciones-create';

describe('EvaluacionesCreate', () => {
  let component: EvaluacionesCreate;
  let fixture: ComponentFixture<EvaluacionesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
