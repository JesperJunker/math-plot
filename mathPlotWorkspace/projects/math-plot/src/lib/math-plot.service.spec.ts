import { TestBed } from '@angular/core/testing';

import { MathPlotService } from './math-plot.service';

describe('MathPlotService', () => {
  let service: MathPlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathPlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
