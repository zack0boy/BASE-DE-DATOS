import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosCreate } from './alumnos-create';

describe('AlumnosCreate', () => {
  let component: AlumnosCreate;
  let fixture: ComponentFixture<AlumnosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
