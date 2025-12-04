import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudantiasCreate } from './ayudantias-create';

describe('AyudantiasCreate', () => {
  let component: AyudantiasCreate;
  let fixture: ComponentFixture<AyudantiasCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyudantiasCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyudantiasCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
