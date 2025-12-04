import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesEdit } from './actividades-edit';

describe('ActividadesEdit', () => {
  let component: ActividadesEdit;
  let fixture: ComponentFixture<ActividadesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
