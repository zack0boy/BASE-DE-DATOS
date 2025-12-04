import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesCreate } from './roles-create';

describe('RolesCreate', () => {
  let component: RolesCreate;
  let fixture: ComponentFixture<RolesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
