import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosCreate } from './anuncios-create';

describe('AnunciosCreate', () => {
  let component: AnunciosCreate;
  let fixture: ComponentFixture<AnunciosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnunciosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
