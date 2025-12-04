import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesCreate } from './actividades-create';

describe('ActividadesCreate', () => {
  let component: ActividadesCreate;
  let fixture: ComponentFixture<ActividadesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
