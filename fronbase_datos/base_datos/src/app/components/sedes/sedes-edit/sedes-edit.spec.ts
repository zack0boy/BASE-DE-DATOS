import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesEdit } from './sedes-edit';

describe('SedesEdit', () => {
  let component: SedesEdit;
  let fixture: ComponentFixture<SedesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
