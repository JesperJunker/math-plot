import { TestBed } from '@angular/core/testing';

import { FormulaUiService } from './formula-ui.service';

describe('FormulaUiService', () => {
  let service: FormulaUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
