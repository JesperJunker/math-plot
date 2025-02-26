import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibFormulaRendererComponent } from './lib-formula-renderer.component';

describe('LibFormulaRendererComponent', () => {
  let component: LibFormulaRendererComponent;
  let fixture: ComponentFixture<LibFormulaRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibFormulaRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibFormulaRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
