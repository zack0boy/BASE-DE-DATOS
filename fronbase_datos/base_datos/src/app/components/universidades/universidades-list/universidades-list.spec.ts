import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversidadesList } from './universidades-list';

describe('UniversidadesList', () => {
  let component: UniversidadesList;
  let fixture: ComponentFixture<UniversidadesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversidadesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversidadesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
