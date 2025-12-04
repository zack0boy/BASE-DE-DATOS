import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudantiasList } from './ayudantias-list';

describe('AyudantiasList', () => {
  let component: AyudantiasList;
  let fixture: ComponentFixture<AyudantiasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyudantiasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyudantiasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
