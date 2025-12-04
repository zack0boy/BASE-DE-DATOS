import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisitosList } from './prerequisitos-list';

describe('PrerequisitosList', () => {
  let component: PrerequisitosList;
  let fixture: ComponentFixture<PrerequisitosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrerequisitosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerequisitosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
