import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotterFormComponent } from './plotter-form.component';

describe('PlotterFormComponent', () => {
  let component: PlotterFormComponent;
  let fixture: ComponentFixture<PlotterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
