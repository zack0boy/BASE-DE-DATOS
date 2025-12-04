import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesEstudioList } from './planes-estudio-list';

describe('PlanesEstudioList', () => {
  let component: PlanesEstudioList;
  let fixture: ComponentFixture<PlanesEstudioList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesEstudioList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesEstudioList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
