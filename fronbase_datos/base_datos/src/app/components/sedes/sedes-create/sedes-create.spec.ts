import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesCreate } from './sedes-create';

describe('SedesCreate', () => {
  let component: SedesCreate;
  let fixture: ComponentFixture<SedesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
