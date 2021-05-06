import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Documento21Component } from './documento21.component';

describe('Documento21Component', () => {
  let component: Documento21Component;
  let fixture: ComponentFixture<Documento21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Documento21Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Documento21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
