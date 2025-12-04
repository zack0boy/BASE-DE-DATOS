import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposEvaluacionList } from './tipos-evaluacion-list';

describe('TiposEvaluacionList', () => {
  let component: TiposEvaluacionList;
  let fixture: ComponentFixture<TiposEvaluacionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposEvaluacionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposEvaluacionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
