import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosCreate } from './contenidos-create';

describe('ContenidosCreate', () => {
  let component: ContenidosCreate;
  let fixture: ComponentFixture<ContenidosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
