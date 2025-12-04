import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasCarreraCreate } from './asignaturas-carrera-create';

describe('AsignaturasCarreraCreate', () => {
  let component: AsignaturasCarreraCreate;
  let fixture: ComponentFixture<AsignaturasCarreraCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturasCarreraCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasCarreraCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
