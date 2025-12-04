import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasList } from './carreras-list';

describe('CarrerasList', () => {
  let component: CarrerasList;
  let fixture: ComponentFixture<CarrerasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
