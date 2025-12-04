import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposActividadList } from './tipos-actividad-list';

describe('TiposActividadList', () => {
  let component: TiposActividadList;
  let fixture: ComponentFixture<TiposActividadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposActividadList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposActividadList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
