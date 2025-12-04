import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPermisosCreate } from './rol-permisos-create';

describe('RolPermisosCreate', () => {
  let component: RolPermisosCreate;
  let fixture: ComponentFixture<RolPermisosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolPermisosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolPermisosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
