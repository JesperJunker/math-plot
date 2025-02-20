import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaRendererComponent } from './formula-renderer.component';

describe('FormulaRendererComponent', () => {
  let component: FormulaRendererComponent;
  let fixture: ComponentFixture<FormulaRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
