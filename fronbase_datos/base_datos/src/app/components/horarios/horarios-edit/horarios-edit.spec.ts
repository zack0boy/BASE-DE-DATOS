import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosEdit } from './horarios-edit';

describe('HorariosEdit', () => {
  let component: HorariosEdit;
  let fixture: ComponentFixture<HorariosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
