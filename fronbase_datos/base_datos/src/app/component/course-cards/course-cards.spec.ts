import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCards } from './course-cards';

describe('CourseCards', () => {
  let component: CourseCards;
  let fixture: ComponentFixture<CourseCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
