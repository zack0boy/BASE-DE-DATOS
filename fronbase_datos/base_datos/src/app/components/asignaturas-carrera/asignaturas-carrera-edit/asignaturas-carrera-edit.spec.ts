import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasCarreraEdit } from './asignaturas-carrera-edit';

describe('AsignaturasCarreraEdit', () => {
  let component: AsignaturasCarreraEdit;
  let fixture: ComponentFixture<AsignaturasCarreraEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturasCarreraEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasCarreraEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
