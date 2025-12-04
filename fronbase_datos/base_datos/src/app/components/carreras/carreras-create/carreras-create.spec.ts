import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasCreate } from './carreras-create';

describe('CarrerasCreate', () => {
  let component: CarrerasCreate;
  let fixture: ComponentFixture<CarrerasCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerasCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerasCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
