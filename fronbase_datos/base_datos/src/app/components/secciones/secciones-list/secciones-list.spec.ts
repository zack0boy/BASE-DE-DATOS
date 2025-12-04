import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesList } from './secciones-list';

describe('SeccionesList', () => {
  let component: SeccionesList;
  let fixture: ComponentFixture<SeccionesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
