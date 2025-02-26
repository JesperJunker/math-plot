import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaUiComponent } from './formula-ui.component';

describe('FormulaUiComponent', () => {
  let component: FormulaUiComponent;
  let fixture: ComponentFixture<FormulaUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
