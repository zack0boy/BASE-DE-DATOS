import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesCreate } from './secciones-create';

describe('SeccionesCreate', () => {
  let component: SeccionesCreate;
  let fixture: ComponentFixture<SeccionesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
