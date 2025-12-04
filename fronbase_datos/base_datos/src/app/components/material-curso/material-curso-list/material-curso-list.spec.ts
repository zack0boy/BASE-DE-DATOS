import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCursoList } from './material-curso-list';

describe('MaterialCursoList', () => {
  let component: MaterialCursoList;
  let fixture: ComponentFixture<MaterialCursoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialCursoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialCursoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
