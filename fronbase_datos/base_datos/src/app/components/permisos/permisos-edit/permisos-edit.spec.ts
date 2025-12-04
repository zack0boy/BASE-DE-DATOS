import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosEdit } from './permisos-edit';

describe('PermisosEdit', () => {
  let component: PermisosEdit;
  let fixture: ComponentFixture<PermisosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
