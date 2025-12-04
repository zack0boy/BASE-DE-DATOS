import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasCreate } from './aulas-create';

describe('AulasCreate', () => {
  let component: AulasCreate;
  let fixture: ComponentFixture<AulasCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulasCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulasCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
