import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosEdit } from './alumnos-edit';

describe('AlumnosEdit', () => {
  let component: AlumnosEdit;
  let fixture: ComponentFixture<AlumnosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
