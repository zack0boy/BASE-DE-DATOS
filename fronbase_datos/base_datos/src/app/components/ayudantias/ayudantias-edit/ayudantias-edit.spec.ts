import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudantiasEdit } from './ayudantias-edit';

describe('AyudantiasEdit', () => {
  let component: AyudantiasEdit;
  let fixture: ComponentFixture<AyudantiasEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyudantiasEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyudantiasEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
