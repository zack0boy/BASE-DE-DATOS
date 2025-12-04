import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosCreate } from './periodos-create';

describe('PeriodosCreate', () => {
  let component: PeriodosCreate;
  let fixture: ComponentFixture<PeriodosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
