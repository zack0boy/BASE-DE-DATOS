import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCursoEdit } from './material-curso-edit';

describe('MaterialCursoEdit', () => {
  let component: MaterialCursoEdit;
  let fixture: ComponentFixture<MaterialCursoEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialCursoEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialCursoEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
