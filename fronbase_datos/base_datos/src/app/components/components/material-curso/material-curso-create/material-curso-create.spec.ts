import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCursoCreate } from './material-curso-create';

describe('MaterialCursoCreate', () => {
  let component: MaterialCursoCreate;
  let fixture: ComponentFixture<MaterialCursoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialCursoCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialCursoCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
