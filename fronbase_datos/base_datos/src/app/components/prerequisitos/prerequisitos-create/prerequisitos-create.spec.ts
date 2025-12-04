import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisitosCreate } from './prerequisitos-create';

describe('PrerequisitosCreate', () => {
  let component: PrerequisitosCreate;
  let fixture: ComponentFixture<PrerequisitosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrerequisitosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerequisitosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
