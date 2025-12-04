import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasList } from './aulas-list';

describe('AulasList', () => {
  let component: AulasList;
  let fixture: ComponentFixture<AulasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
