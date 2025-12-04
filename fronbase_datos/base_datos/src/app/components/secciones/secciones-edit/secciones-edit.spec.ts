import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesEdit } from './secciones-edit';

describe('SeccionesEdit', () => {
  let component: SeccionesEdit;
  let fixture: ComponentFixture<SeccionesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
