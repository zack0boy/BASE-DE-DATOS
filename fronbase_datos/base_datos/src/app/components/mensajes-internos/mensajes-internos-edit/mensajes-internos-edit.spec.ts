import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesInternosEdit } from './mensajes-internos-edit';

describe('MensajesInternosEdit', () => {
  let component: MensajesInternosEdit;
  let fixture: ComponentFixture<MensajesInternosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesInternosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesInternosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
