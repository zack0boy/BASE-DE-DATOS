import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPermisosEdit } from './rol-permisos-edit';

describe('RolPermisosEdit', () => {
  let component: RolPermisosEdit;
  let fixture: ComponentFixture<RolPermisosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolPermisosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolPermisosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
