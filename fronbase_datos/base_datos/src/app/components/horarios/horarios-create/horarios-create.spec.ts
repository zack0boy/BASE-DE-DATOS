import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosCreate } from './horarios-create';

describe('HorariosCreate', () => {
  let component: HorariosCreate;
  let fixture: ComponentFixture<HorariosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
