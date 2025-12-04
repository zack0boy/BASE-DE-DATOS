import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosEdit } from './contenidos-edit';

describe('ContenidosEdit', () => {
  let component: ContenidosEdit;
  let fixture: ComponentFixture<ContenidosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
