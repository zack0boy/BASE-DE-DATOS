import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionCurso } from './descripcion-curso';

describe('DescripcionCurso', () => {
  let component: DescripcionCurso;
  let fixture: ComponentFixture<DescripcionCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescripcionCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescripcionCurso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
