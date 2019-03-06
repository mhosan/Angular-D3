import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicoPuntosComponent } from './basico-puntos.component';

describe('BasicoPuntosComponent', () => {
  let component: BasicoPuntosComponent;
  let fixture: ComponentFixture<BasicoPuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicoPuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicoPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
