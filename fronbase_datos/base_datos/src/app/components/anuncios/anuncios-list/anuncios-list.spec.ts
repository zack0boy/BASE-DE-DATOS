import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosList } from './anuncios-list';

describe('AnunciosList', () => {
  let component: AnunciosList;
  let fixture: ComponentFixture<AnunciosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnunciosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
