import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesEdit } from './roles-edit';

describe('RolesEdit', () => {
  let component: RolesEdit;
  let fixture: ComponentFixture<RolesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
