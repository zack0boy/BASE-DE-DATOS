import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraPage } from './carrera-page';

describe('CarreraPage', () => {
  let component: CarreraPage;
  let fixture: ComponentFixture<CarreraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreraPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
