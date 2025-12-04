import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasCreate } from './notas-create';

describe('NotasCreate', () => {
  let component: NotasCreate;
  let fixture: ComponentFixture<NotasCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
