import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesInternosCreate } from './mensajes-internos-create';

describe('MensajesInternosCreate', () => {
  let component: MensajesInternosCreate;
  let fixture: ComponentFixture<MensajesInternosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesInternosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesInternosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
