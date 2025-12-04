import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesList } from './evaluaciones-list';

describe('EvaluacionesList', () => {
  let component: EvaluacionesList;
  let fixture: ComponentFixture<EvaluacionesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
