import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisitosEdit } from './prerequisitos-edit';

describe('PrerequisitosEdit', () => {
  let component: PrerequisitosEdit;
  let fixture: ComponentFixture<PrerequisitosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrerequisitosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerequisitosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
