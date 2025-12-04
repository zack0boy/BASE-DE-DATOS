import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposActividadEdit } from './tipos-actividad-edit';

describe('TiposActividadEdit', () => {
  let component: TiposActividadEdit;
  let fixture: ComponentFixture<TiposActividadEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposActividadEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposActividadEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
