import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPermisosList } from './rol-permisos-list';

describe('RolPermisosList', () => {
  let component: RolPermisosList;
  let fixture: ComponentFixture<RolPermisosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolPermisosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolPermisosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
