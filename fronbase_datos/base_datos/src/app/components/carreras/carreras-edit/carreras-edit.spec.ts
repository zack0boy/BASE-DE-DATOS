import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasEdit } from './carreras-edit';

describe('CarrerasEdit', () => {
  let component: CarrerasEdit;
  let fixture: ComponentFixture<CarrerasEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerasEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerasEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
