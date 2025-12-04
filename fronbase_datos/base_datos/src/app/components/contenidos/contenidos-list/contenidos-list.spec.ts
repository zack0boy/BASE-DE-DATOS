import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosList } from './contenidos-list';

describe('ContenidosList', () => {
  let component: ContenidosList;
  let fixture: ComponentFixture<ContenidosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
