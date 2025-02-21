import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotRendererComponent } from './plot-renderer.component';

describe('PlotRendererComponent', () => {
  let component: PlotRendererComponent;
  let fixture: ComponentFixture<PlotRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
