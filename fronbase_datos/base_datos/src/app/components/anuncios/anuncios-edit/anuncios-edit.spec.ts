import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosEdit } from './anuncios-edit';

describe('AnunciosEdit', () => {
  let component: AnunciosEdit;
  let fixture: ComponentFixture<AnunciosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnunciosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
