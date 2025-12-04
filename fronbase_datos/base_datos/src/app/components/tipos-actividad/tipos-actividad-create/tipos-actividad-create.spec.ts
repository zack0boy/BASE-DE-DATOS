import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposActividadCreate } from './tipos-actividad-create';

describe('TiposActividadCreate', () => {
  let component: TiposActividadCreate;
  let fixture: ComponentFixture<TiposActividadCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposActividadCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposActividadCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
