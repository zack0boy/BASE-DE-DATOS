import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesEstudioEdit } from './planes-estudio-edit';

describe('PlanesEstudioEdit', () => {
  let component: PlanesEstudioEdit;
  let fixture: ComponentFixture<PlanesEstudioEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesEstudioEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesEstudioEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
