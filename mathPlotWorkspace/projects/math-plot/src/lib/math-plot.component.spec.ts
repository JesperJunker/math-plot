import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathPlotComponent } from './math-plot.component';

describe('MathPlotComponent', () => {
  let component: MathPlotComponent;
  let fixture: ComponentFixture<MathPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathPlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
