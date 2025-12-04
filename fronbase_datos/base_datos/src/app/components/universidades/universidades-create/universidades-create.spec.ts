import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversidadesCreate } from './universidades-create';

describe('UniversidadesCreate', () => {
  let component: UniversidadesCreate;
  let fixture: ComponentFixture<UniversidadesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversidadesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversidadesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
