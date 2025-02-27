import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RendererComponent } from 'math-plot';
import { ReactiveFormsModule } from '@angular/forms';
import { FormulaRendererComponent } from 'formula-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RendererComponent,
    ReactiveFormsModule,
    FormulaRendererComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  formula = 'sqrt(1/2)+sqrt(1/(2/2))+sqrt((1/2)/2)+sqrt((1/3)/(2/2))-sqrt(2+3)';
  testi() {
    this.formula = 'sin(x)';
  }
  title = 'math-plot-demo';
  protected readonly config = {
    start: 0,
    end: 720,
    formula: '(cos(3*x/2)+cos(6*(x-45)))/2',
    points: [],
    planeType: 'Polar',
  };
}
