import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesInternosList } from './mensajes-internos-list';

describe('MensajesInternosList', () => {
  let component: MensajesInternosList;
  let fixture: ComponentFixture<MensajesInternosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesInternosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesInternosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
