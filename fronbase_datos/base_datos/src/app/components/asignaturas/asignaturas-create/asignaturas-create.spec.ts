import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasCreate } from './asignaturas-create';

describe('AsignaturasCreate', () => {
  let component: AsignaturasCreate;
  let fixture: ComponentFixture<AsignaturasCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturasCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
