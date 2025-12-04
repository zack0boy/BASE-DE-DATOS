import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasList } from './asignaturas-list';

describe('AsignaturasList', () => {
  let component: AsignaturasList;
  let fixture: ComponentFixture<AsignaturasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
