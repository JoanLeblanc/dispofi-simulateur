import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSimulationComponent } from './form-simulation.component';

describe('FormSimulationComponent', () => {
  let component: FormSimulationComponent;
  let fixture: ComponentFixture<FormSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSimulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
