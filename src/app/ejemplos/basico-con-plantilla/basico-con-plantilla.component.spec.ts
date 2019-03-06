import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicoConPlantillaComponent } from './basico-con-plantilla.component';

describe('BasicoConPlantillaComponent', () => {
  let component: BasicoConPlantillaComponent;
  let fixture: ComponentFixture<BasicoConPlantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicoConPlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicoConPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
