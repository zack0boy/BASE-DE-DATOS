import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposEvaluacionCreate } from './tipos-evaluacion-create';

describe('TiposEvaluacionCreate', () => {
  let component: TiposEvaluacionCreate;
  let fixture: ComponentFixture<TiposEvaluacionCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposEvaluacionCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposEvaluacionCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
