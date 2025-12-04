import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversidadesEdit } from './universidades-edit';

describe('UniversidadesEdit', () => {
  let component: UniversidadesEdit;
  let fixture: ComponentFixture<UniversidadesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversidadesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversidadesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
