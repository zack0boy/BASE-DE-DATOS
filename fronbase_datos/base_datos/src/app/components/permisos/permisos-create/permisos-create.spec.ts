import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosCreate } from './permisos-create';

describe('PermisosCreate', () => {
  let component: PermisosCreate;
  let fixture: ComponentFixture<PermisosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
