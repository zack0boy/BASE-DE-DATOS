import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasEdit } from './notas-edit';

describe('NotasEdit', () => {
  let component: NotasEdit;
  let fixture: ComponentFixture<NotasEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
