import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasCarreraList } from './asignaturas-carrera-list';

describe('AsignaturasCarreraList', () => {
  let component: AsignaturasCarreraList;
  let fixture: ComponentFixture<AsignaturasCarreraList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturasCarreraList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasCarreraList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
