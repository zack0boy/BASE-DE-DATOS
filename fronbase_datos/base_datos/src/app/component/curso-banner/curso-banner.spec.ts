import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoBanner } from './curso-banner';

describe('CursoBanner', () => {
  let component: CursoBanner;
  let fixture: ComponentFixture<CursoBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
