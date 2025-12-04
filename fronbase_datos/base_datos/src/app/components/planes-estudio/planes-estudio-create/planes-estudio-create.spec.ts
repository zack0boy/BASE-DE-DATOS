import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesEstudioCreate } from './planes-estudio-create';

describe('PlanesEstudioCreate', () => {
  let component: PlanesEstudioCreate;
  let fixture: ComponentFixture<PlanesEstudioCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesEstudioCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesEstudioCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
